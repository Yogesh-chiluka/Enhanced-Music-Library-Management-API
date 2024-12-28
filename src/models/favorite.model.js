import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const favoriteSchema = new Schema({


    category:{
        type:String,
        enum:['artist','track','album'],
        require: true
    },

    item_id:{
        type:Schema.Types.ObjectId,
        require:true
    },
    
    owner:{ 
        type: Schema.Types.ObjectId, 
        ref:'User'
    },
},
{
    timestamps:true
})

favoriteSchema.plugin(mongooseAggregatePaginate);
export const Favorite = mongoose.model('Favorite',favoriteSchema);



/*
Scalabel schema

const favoriteSchema = new Schema({

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