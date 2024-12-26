import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const generateAccessAndRefreshTokens = async(userId) =>{
    try{
        
        const user= await User.findById(userId)
       
        const accessToken =  user.generateAccessToken()
       
        const refreshToken = user.generateRefreshToken()
        
        user.refreshtoken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken,refreshToken}

    }catch(error){
       // console.log(error)
        throw new ApiError(500,"Something went wrong while generating token")
    }

}   

const registerUser = asyncHandler(async (req,res) => {

    const {email, password} = req.body


    const user = await User.create({
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )
})  

const loginUser = asyncHandler(async (req,res) => {
    
    const {email, username, password} = req.body

    if(!(username || email)){
        throw new ApiError(400,"Username or email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })
    if(!User){
        throw new ApiError(404,"User dosen't exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials")
    }
    //console.log("start generatig token ---------------------------")
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    

    const loggedInUser = await User.findById(user._id).select("-password -refreshtoken")

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
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})


export{
    registerUser,
    loginUser
}
