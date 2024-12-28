import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

import {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbumById,
    deleteAlbumById,
} from '../services/album.service.js'

import { 
    validateArtistHiddenArtistId,
    validateIdField,
    validateArtistHidden

} from '../validators/albumValidation.js'


//check
const getAllAlbumsController = asyncHandler(async (req,res) => {

    const { error, value } = validateArtistHidden(req.query);

    if( error ){
        throw new ApiError(400, `Bad Request, Reason: ${error}`)
    }

    const allAlbums = await getAllAlbums( value.artist_id, value.hidden, value.offset, value.limit).catch( (err)=>{
        throw new ApiError(400, err.message)
    })

    return res.status(200).json(
        new ApiResponse(200, allAlbums.docs, "Albums retrieved successfully.")
    )
})  
//check
const getAlbumByIdController = asyncHandler(async (req,res) => {

    const { error, value } = validateIdField(req.params.id);

    if( error ){
        throw new ApiError(400, `Bad Request, Reason: ${error}`)
    }
   
    const album = await getAlbumById(value.id);
    
    return res.status(200).json(
        new ApiResponse(200, album[0], "Albums retrieved successfully.")
    )
})  

const addAlbumController = asyncHandler(async (req,res) => {

    const { error, value } = validateArtistHiddenArtistId(req.body);

    if(error){
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }

    const album = await createAlbum( value.artist_id, value.name, value.year, value.hidden);
   
    //await getAlbumById(album._id);

    return res.status(201).json(
        new ApiResponse(201, null , "Album created successfully.")
    )
})  

// check for single field update
const updateAlbumByIdController = asyncHandler(async (req,res) => {

    const idValidation = validateIdField(req.params?.id);

    const bodyValidation = validateNameYearHidden(req.body);

    if(idValidation.error || bodyValidation.error){
        const error = idValidation.error ? idValidation.error : bodyValidation.error;
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }
  
    const album = await updateAlbumById
    (
        idValidation.value.albumId,
        bodyValidation.value.name, 
        bodyValidation.value.year, 
        bodyValidation.value.hidden
    );

    return res.status(201).json(
        new ApiResponse(201, null , "Album updated successfully.")
    )
})  

const deleteAlbumByIdController = asyncHandler(async (req,res) => {

    const { error, value } = validateIdField(req.params.id);

    if(error){
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }

    const album = await deleteAlbumById(value.id);

    
    return res.status(200).json(
        new ApiResponse(200, null , `Album: ${album[0].name} deleted successfully.`)
    )
})  



export {
    getAllAlbumsController,
    getAlbumByIdController,
    addAlbumController,
    updateAlbumByIdController,
    deleteAlbumByIdController
} 
