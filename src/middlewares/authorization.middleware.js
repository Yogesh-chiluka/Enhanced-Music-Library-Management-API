import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js'

const verifyAdmin = asyncHandler(async (req, _,res) => {

    const currentUser = await User.findById(req.user._id);

    if(currentUser.role  === 'admin'){
        next();
    }else{
        throw new ApiError(401,"Only admin can access resource/api");
    }
    throw new ApiError(401,"Something went wrong while validating role");
});
const verifyEditor = asyncHandler(async (req, _,res) => {
    const currentUser = await User.findById(req.user._id);

    if(currentUser.role  === 'admin'){
        next();
    }else{
        throw new ApiError(401,"Only admin can access resource/api");
    }
    throw new ApiError(401,"Something went wrong while validating role");
});

const verifyViewer = asyncHandler(async (req, _,res) => {
    const currentUser = await User.findById(req.user._id);

    if(currentUser.role  === 'admin'){
        next();
    }else{
        throw new ApiError(401,"Only admin can access resource/api");
    }
    throw new ApiError(401,"Something went wrong while validating role");
});


export {
    verifyAdmin,
    verifyEditor,
    verifyViewer,
}