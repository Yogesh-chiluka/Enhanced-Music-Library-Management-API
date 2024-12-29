import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

import {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtistById,
    deleteArtistById,
} from '../services/artist.service.js'

import { 
    validateGrammyHidden,
    validateNameGrammyHidden,
    validateIdField,

} from '../validators/artistValidation.js'

const getAllArtistsController = asyncHandler(async (req,res) => {

    const { error, value } = validateGrammyHidden(req.query);

    if( error ){
        throw new ApiError(400, `Bad Request, Reason: ${error}`)
    }

    const allArtists = await getAllArtists( value.grammy, value.hidden, value.offset, value.limit).catch( (err)=>{
        throw new ApiError(400, err.message)
    })

    return res.status(200).json(
        new ApiResponse(200, allArtists.docs, "Artists retrieved successfully.")
    )
})  

const getArtistByIdController = asyncHandler(async (req,res) => {

    const { error, value } = validateIdField(req.params?.id);

    if( error ){
        throw new ApiError(400, `Bad Request, Reason: ${error}`)
    }
   
    const artist = await getArtistById(value.artistId);

    if(!artist) {
        throw new ApiError(404,'Artist not found.')
    } 

    const transformedArtist =  { 
        artist_id: artist._id, 
        name: artist.name, 
        grammy: artist.grammy, 
        hidden: artist.hidden, 
    }
    
    return res.status(200).json(
        new ApiResponse(200, transformedArtist, "Artists retrieved successfully.")
    )
})

const addArtistController = asyncHandler(async (req,res) => {
    
    const { error, value } = validateNameGrammyHidden(req.body);

    if(error){
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }

    const artist = await createArtist(value.name, value.grammy, value.hidden);

    //await getArtistById(artist._id);

    return res.status(201).json(
        new ApiResponse(201, null , "Artist created successfully.")
    )
})  

const updateArtistByIdController = asyncHandler(async (req,res) => {

    
    const idValidation = validateIdField(req.params?.id);

    const bodyValidation = validateNameGrammyHidden(req.body);

    if(idValidation.error || bodyValidation.error){
        const error = idValidation.error ? idValidation.error : bodyValidation.error;
        throw new ApiError(400, `${error}.`)
    }
  
    const artist = await updateArtistById
    (
        idValidation.value.artistId,
        bodyValidation.value.name, 
        bodyValidation.value.grammy, 
        bodyValidation.value.hidden
    );

    return res.status(201).json(
        new ApiResponse(201, null , "Artist updated successfully.")
    )
})  

const deleteArtistByIdController = asyncHandler(async (req,res) => {
    
    const { error, value } = validateIdField(req.params.id);

    if(error){
        throw new ApiError(400, `${error}.`)
    }

    await deleteArtistById(value.artistId);

    return res.status(200).json(
        new ApiResponse(200, null , "Artist deleted successfully.")
    )
})  

export { 
    getAllArtistsController,
    getArtistByIdController,
    addArtistController,
    updateArtistByIdController,
    deleteArtistByIdController,
 }