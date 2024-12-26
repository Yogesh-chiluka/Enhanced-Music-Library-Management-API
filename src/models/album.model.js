import mongoose, { Schema } from 'mongoose'



const albumSchema = new Schema({

    _id: { 
        type: Schema.Types.ObjectId, 
        alias: 'album_id' 
    },

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



export const Album = mongoose.model('Album',albumSchema);