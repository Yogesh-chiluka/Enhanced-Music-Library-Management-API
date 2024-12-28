import mongoose, { Schema } from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


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



tackSchema.plugin(mongooseAggregatePaginate);
export const Track = mongoose.model('Track',tackSchema);