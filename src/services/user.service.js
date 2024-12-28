import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { Admin } from '../models/admin.model.js'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';


const generateAccessAndRefreshTokens = async(userId) =>{
    try{

        const user = await getUserById(userId);
       
        const accessToken =  user.generateAccessToken()
       
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return {accessToken,refreshToken}

    }catch(error){
       // console.log(error)
        throw new ApiError(500,"Something went wrong while generating token")
    }

}   

const createUser = async(email, password, role = 'VIEWER') => {

    // get adminflag
    const checkAdmin = await Admin.find();
    if(checkAdmin.length <= 0){
        role = 'ADMIN';
        await Admin.create({ adminflag: true });
    }

    const userExist = await getUserByEmail(email);

    if(userExist){
        throw new ApiError(409,"Email already exists.")
    }

    const user = await User.create({
            email,
            password,
            role,
    })

    

    if(!user){
        throw new ApiError(500, "Something went wrong while registering the user.")
    }

    return user;
}

const getUserById = async(userId) => {

    const user = await User.findById(userId);

    return user;
}

const getUserByEmail = async(email) => {

    const user = await User.findOne({ email })
    
    return user;
}
const validatePassword = async(user, password) => {
    
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials")
    }

    return isPasswordValid;
}


const unsetRefreshToken = async (userId) => {
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        );

        if (!user) {
            throw new ApiError(404, 'User not found');
        }
};


const getAllUsers = async (offset, limit, role) => {
    const pipeline = [];

    if (role) {
        pipeline.push({
            $match: {
                role: role
            }
        });
    }

    pipeline.push({
        $project: {
            user_id: '$_id',
            _id: 0, 
            email: 1,
            role: 1,
            created_at: '$createdAt'
        }
    });
        const userAggregate = User.aggregate(pipeline);

        const page = Math.ceil(parseInt(offset, 10) / parseInt(limit, 10)) + 1;

        const options = {
            page: page,
            limit: parseInt(limit, 10)
        };
       
        const paginatedUsers = await User.aggregatePaginate(userAggregate, options);

        return paginatedUsers;
};


const deleteUserById = async(userId) =>{

    const user = await getUserById(userId);

    if(!user){
        throw new ApiError(404, 'User not found');
    }

    await User.findByIdAndDelete(userId);
};

const updateUserPassword = async(userId,old_password,new_password) =>{

    const user = await getUserById(userId);

    const validPassword = await validatePassword(user,old_password);

    user.password = new_password;

    await user.save({validateBeforeSave:true})

    return user;
};

// newPassword
// oldPassword




export {
    createUser,
    getUserById,
    getUserByEmail,
    validatePassword,
    generateAccessAndRefreshTokens,
    unsetRefreshToken,
    getAllUsers,
    deleteUserById,
    updateUserPassword,
}