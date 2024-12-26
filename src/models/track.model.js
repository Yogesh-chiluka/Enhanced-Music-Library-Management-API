import mongoose, { Schema } from 'mongoose'



const trackSchema = new Schema({
    _id: { 
        type: Schema.Types.ObjectId, 
        alias: 'artist_id' 
    },
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



export const Track = mongoose.model('Track',trackSchema);