import mongoose, { Schema } from 'mongoose'



const favoritiesSchema = new Schema({

    category:{
        track:[
            {
                type: Schema.Types.ObjectId,
                ref:'Track'
            }
        ],
        artist:[
            {
                type: Schema.Types.ObjectId,
                ref:'Artist'
            }
        ],
        album:[
            {
                type: Schema.Types.ObjectId,
                ref:'Album'
            }
        ],
    }
    
    Owner:{ 
        type: Schema.Types.Object, 
        ref:'User' 
    },
},
{
    timestamps:true;
})



const export Favorities = mongoose.model('Favorities',favoritiesSchema);