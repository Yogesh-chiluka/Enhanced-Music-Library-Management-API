import mongoose, { Schema } from 'mongoose'



const tackSchema = new Schema({

    name:{
        type:String,
        require:true,
        lowercase: true,
    },
    grammy:{
        type:Number,
        require:true,
        default:0
    },
    hidden:{
        type:Boolean,
        default: false
    }
},
{
    timestamps:true
})



export const Track = mongoose.model('Track',tackSchema);