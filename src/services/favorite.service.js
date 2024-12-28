import { ApiError } from '../utils/ApiError.js'
import { Favorite } from '../models/favorite.model.js'

import { Artist } from '../models/artist.model.js'
import { Album } from '../models/album.model.js'
import { Track } from '../models/track.model.js'

import mongoose from 'mongoose';



const getAllFavorites = async(userId, category, offset, limit) => {

    
    const pipeline = [];
    
    //get only current user favorites
    pipeline.push({
        $match: {
            owner: new mongoose.Types.ObjectId(userId)
        }
    })

    //Only based on specified category
    pipeline.push({
        $match: {
            category: category
        }
    })

    pipeline.push({
        $lookup: {
            from: `${category}s`,
            localField: 'item_id',
            foreignField: '_id',
            as: 'output',
            pipeline: [
              {
                  $project: {
                      name: 1,
                        _id:0
                  }
              }
          ]
          }
        },{
          $unwind: '$output'
        },
        {
        $project: {
            favorite_id: '$_id',
            _id: 0, 
            category:1,
            item_id:1,
            name: '$output.name',
            created_at:'$createdAt'
        }
    })
        
    const favoriteAggregate = Favorite.aggregate(pipeline);
    
    const page = Math.ceil(parseInt(offset, 10) / parseInt(limit, 10)) + 1;
    
    const options = {
        page: page,
        limit: parseInt(limit, 10)
    };
           
    const paginatedFavorites = await Favorite.aggregatePaginate(favoriteAggregate, options);
    const find = await Favorite.findById(userId)
    console.log(paginatedFavorites.docs)
    return paginatedFavorites;
}

const getUserFavoriteById = async(userId, favoriteId) => {
    const favorite = await Favorite.find(
        { 
            owner: new mongoose.Types.ObjectId(userId),
            _id: new mongoose.Types.ObjectId(favoriteId)
        }
    );

    if(!favorite[0]){
        throw new ApiError(404, 'Favorite not found');
    }

    return favorite;
}

const findExistingFavourite = async (userId, category, item_id) => {
    const favourite = await Favorite.findOne({
        owner: userId,
        category,
        item_id
    });
    return favourite;
};

const getType = async (category, item_id) => {
    let item;

    if (category === 'artist') {
        item = await Artist.findById(item_id);
    } else if (category === 'album') {
        item = await Album.findById(item_id);
    } else {
        item = await Track.findById(item_id);
    }

    if (!item) {
        throw new ApiError(409, `${category} with item_id not found.`)
    } 

    return item;
};


const addFavorite = async (userId, category, item_id) => {
    
    const alreadyExist = await findExistingFavourite(userId, category, item_id);
 
    if(alreadyExist){
        throw new ApiError(409, 'Favorite already exists');
    }
    
    const favorite = await Favorite.create({
        owner: userId,
        category,
        item_id
    });
    
    if(!favorite){
        throw new ApiError('Something went wrong whilw creating favorite')
    }
};


const deleteFavoriteById = async(userId,favoriteId) => {
    
    const favorite = await getUserFavoriteById(userId,favoriteId);

    await Favorite.findByIdAndDelete(favorite[0]._id);
    
    return favorite[0];
}



export {
    getAllFavorites,
    addFavorite,
    deleteFavoriteById,
    getType
}