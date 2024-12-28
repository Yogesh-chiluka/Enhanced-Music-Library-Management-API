import mongoose, { Schema } from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const albumSchema = new Schema({

    name:{
        type:String,
        require:true,
        lowercase: true,
    },
    year:{
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
    }
},
{
    timestamps:true
})


albumSchema.plugin(mongooseAggregatePaginate);
export const Album = mongoose.model('Album',albumSchema);