import mongoose, { Schema } from 'mongoose';



const favouriteSchema = new Schema({


    category:{
        type:String,
        enum:['artist','track','album'],
        require: true
    },

    item_id:{
        type:Schema.Types.ObjectId,
        require:true
    },
    
    Owner:{ 
        type: Schema.Types.ObjectId, 
        ref:'User'
    },
},
{
    timestamps:true
})



export const Favourite = mongoose.model('Favourite',favouriteSchema);



/*
Scalabel schema

const favouriteSchema = new Schema({

    category:{
        track:[
            {
                type: Schema.Types.ObjectId,
                ref:'Track',
            },
        ],
        artist:[
            {
                type: Schema.Types.ObjectId,
                ref:'Artist',
            },
        ],
        album:[
            {
                type: Schema.Types.ObjectId,
                ref:'Album',
            },
        ],

    },
    
    Owner:{ 
        type: Schema.Types.ObjectId, 
        ref:'User'
    },
},
{
    timestamps:true
})
*/