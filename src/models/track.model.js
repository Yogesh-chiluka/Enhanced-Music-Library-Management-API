import mongoose, { Schema } from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const trackSchema = new Schema({

    name:{
        type:String,
        require:true,
        lowercase: true,
    },
    duration:{
        type:Number,
        require:true,
    },
    hidden:{
        type:Boolean,
        default: false
    },
    artist:{
        type: Schema.Types.ObjectId,
        ref:'Artist',
        require:true
    },
    album:{
        type: Schema.Types.ObjectId,
        ref:'Album',
        require:true
    }
},
{
    timestamps:true
})


trackSchema.plugin(mongooseAggregatePaginate);
export const Track = mongoose.model('Track',trackSchema);