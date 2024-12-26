import { asyncHandler } from '../utils/asyncHandler.js'


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




export{
    registerUser
}
