import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { 
    createUser,
    getUserById,
    getUserByEmail,
    validatePassword,
    generateAccessAndRefreshTokens,
    unsetRefreshToken,
    getAllUsers,
    deleteUserById,
    updateUserPassword,
 } from '../services/user.service.js';


 import { 
    validateEmailPasswordRoleFields,
    validateEmailPasswordFields,
    validateIdField,
    validateOldNewPasswordFields,
  } from '../validators/userValidation.js';

const registerUserController = asyncHandler(async (req,res) => {

    const { error, value } = validateEmailPasswordFields(req.body);

    if(error){
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }

    const user = await createUser(value.email, value.password);

    const createdUser = await getUserById(user._id);

    return res.status(201).json(
        new ApiResponse(201, null , "User created successfully.")
    )
})  

const loginUserController = asyncHandler(async (req,res) => {
    
    const { error, value } = validateEmailPasswordFields(req.body);

    if(error){
        throw new ApiError(400, `Bad Request, Reason:${error}.`)
    }

    const user = await getUserByEmail(value.email);

    if(!user){
        throw new ApiError(404, `User not found.`)
    }

    const validPassword = await validatePassword(user,value.password);

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
    
    const loggedInUser = await getUserById(user._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                "token": loggedInUser.refreshToken,
            },
            "Login successful."
        )
    )

})


const logoutUserController = asyncHandler(async(req,res) => {


    const user = await getUserById(req.user._id);

    if(!user){
        throw new ApiError(400,'Bad Request.')
    }

    await unsetRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: true    
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200, null, "User logged out successfully.")
    )
})

const getUsersController = asyncHandler(async(req,res)=>{

    const { offset = 0, limit = 5, role } = req.query;

    const roleToUppercase = role?.toUpperCase();

    if (roleToUppercase && !(roleToUppercase === 'EDITOR' || roleToUppercase === 'VIEWER')) {
        throw new ApiError(400, "Bad Request, Role can be only Editor or Viewer")
    } 

    const allUsers = await getAllUsers(offset,limit,roleToUppercase).catch( (err)=>{
        throw new ApiError(400, err.message)
    })

    return res.status(200).json(
        new ApiResponse(200, allUsers.docs, "Users retrieved successfully.")
    )

})

const addUserController = asyncHandler(async(req,res)=>{

    const { error, value } = validateEmailPasswordRoleFields(req.body);

    if(error){
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }

    const user = await createUser(value.email, value.password);

    const createdUser = await getUserById(user._id);

    return res.status(201).json(
        new ApiResponse(201, null , "User created successfully.")
    )
})


const deleteUserController = asyncHandler(async(req,res)=>{

    const userId = req.params.id;
    
    const { error } = validateIdField(userId);

    if(error){
        throw new ApiError(400, `${error}.`)
    }

    await deleteUserById(userId);

    return res.status(200).json(
        new ApiResponse(200, null , "User deleted successfully.")
    )
    
})

const updatePasswordController = asyncHandler(async(req,res)=>{

    //old_password
    //new_password
    const { error, value } = validateOldNewPasswordFields(req.body);

    if(error){
        throw new ApiError(400, `Bad Request, Reason:${error}.`)
    }

    const user = await updateUserPassword(req.user._id, value.old_password, value.new_password);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                user,
            },
            "Password updated successfully"
        )
    )
})


export{
    registerUserController,
    loginUserController,
    logoutUserController,
    getUsersController,
    addUserController,
    deleteUserController,
    updatePasswordController,
}
