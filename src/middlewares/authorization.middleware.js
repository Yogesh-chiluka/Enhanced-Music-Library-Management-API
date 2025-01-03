import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { getUserById } from '../services/user.service.js'

const verifyAdmin = asyncHandler(async (req, _,next) => {
    
    const currentUser = await getUserById(req.user._id);

    if(currentUser.role  === 'ADMIN'){
        next()
    }else{
        throw new ApiError(403,"Forbidden Access/Operation not allowed.");
    }
});
const verifyEditor = asyncHandler(async (req, _,next) => {

    const currentUser = await getUserById(req.user._id);

    if(currentUser.role  === 'EDITOR' || currentUser.role  === 'ADMIN'){
        next();
    }else{
        throw new ApiError(403,"Forbidden Access/Operation not allowed.");
    }

});

const verifyViewer = asyncHandler(async (req, _,next) => {
    const currentUser = await getUserById(req.user._id);

    if(currentUser.role  === 'VIEWER' || currentUser.role  === 'EDITOR' || currentUser.role  === 'ADMIN'){
        next();
    }else{
        throw new ApiError(403,"Forbidden Access/Operation not allowed.");
    }

});


export {
    verifyAdmin,
    verifyEditor,
    verifyViewer,
}