import mongoose, { Schema, } from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new Schema({

    _id: { 
        type: Schema.Types.ObjectId, 
        alias: 'user_id' 
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: [true,'Password is required']
    },
    role:{
        type: String,
        enum:['ADMIN','EDITOR','VIEWER'],
        default: 'VIEWER'
    },
    refreshToken:{
        type: String
    },
},
{
    timestamps:true
})

userSchema.pre('save',async function(){
    if(!this.isModefied("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.method.ispasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}


userSchema.method.generateAccessToken = function(){

    return JsonWebTokenError.sign(
        {
            _id:this._id,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.method.generateRefreshToken = function(){

    return JsonWebTokenError.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User',UserSchema);

