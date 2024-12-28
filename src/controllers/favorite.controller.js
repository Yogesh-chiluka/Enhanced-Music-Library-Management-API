import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

import {
    getAllFavorites,
    addFavorite,
    deleteFavoriteById,
    getType,
} from '../services/favorite.service.js'

import { 
    validateFilterFields,
    validateIdField,
    validateAddFavoriteFields,
} from '../validators/favoriteValidation.js'


//check
const getAllFavoritesController = asyncHandler(async (req,res) => {

    const { error, value } = validateFilterFields(req.query);

    if( error ){
        throw new ApiError(400, `Bad Request, Reason: ${error}`)
    }

    const allFavorites = await getAllFavorites( req.user._id, value.category, value.offset, value.limit).catch( (err)=>{
        throw new ApiError(400, err.message)
    })

    return res.status(200).json(
        new ApiResponse(200, allFavorites.docs, "Favorites retrieved successfully.")
    )
})  

const addFavoriteController = asyncHandler(async (req,res) => {
    
    const { error, value } = validateAddFavoriteFields(req.body);
    
    if(error){
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }

    const type = await getType(value.category, value.item_id);
     
    const favorite = await addFavorite( req.user._id, value.category, value.item_id);
    
    return res.status(201).json(
        new ApiResponse(201, null , "Favorite added successfully.")
    )
})  

const deleteFavoriteByIdController = asyncHandler(async (req,res) => {

    const { error, value } = validateIdField(req.params.id);

    if(error){
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }

    const favorite = await deleteFavoriteById(req.user._id,value.id);

    
    return res.status(200).json(
        new ApiResponse(200, null , ` Favorite removed successfully.`)
    )
})  



export {
    getAllFavoritesController,
    addFavoriteController,
    deleteFavoriteByIdController
} 
