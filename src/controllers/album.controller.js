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
    validateArtistHidden,
    validateUpdateAlbumFields

} from '../validators/albumValidation.js'

import {
    getArtistById,
} from '../services/artist.service.js'


//check
const getAllAlbumsController = asyncHandler(async (req,res) => {

    const { error, value } = validateArtistHidden(req.query);

    if( error ){
        throw new ApiError(400, `${error}`)
    }

    if(value.artist_id){
        const artist = await getArtistById(value.artist_id);

        if(!artist){
            throw new ApiError(404, `Resource Doesn't Exist.`)
        }
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

    if(!album[0]){
        throw new ApiError(404, `Resource Doesn't Exist.`)
    }
    
    return res.status(200).json(
        new ApiResponse(200, album[0], "Albums retrieved successfully.")
    )
})  

const addAlbumController = asyncHandler(async (req,res) => {

    const { error, value } = validateArtistHiddenArtistId(req.body);

    if(error){
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }

    const artist = await getArtistById(value.artist_id);

    if(!artist){
        throw new ApiError(404, `Resource Doesn't Exist.`)
    }

    const album = await createAlbum( value.artist_id, value.name, value.year, value.hidden);
   
    //await getAlbumById(album._id);

    return res.status(201).json(
        new ApiResponse(201, null , "Album created successfully.")
    )
})  

// check for single field update
const updateAlbumByIdController = asyncHandler(async (req,res) => {

    const idValidation = validateIdField(req.params.id);
    
    if(idValidation.error){
        throw new ApiError(400, `${idValidation.error}.`)
    }

    const bodyValidation = validateUpdateAlbumFields(req.body);
    
    if(bodyValidation.error){
        throw new ApiError(400, `Bad Request, Reason: ${bodyValidation.error}.`)
    }

    const album = await updateAlbumById
    (
        idValidation.value.id,
        bodyValidation.value
    );

    if(!album){
        throw new ApiError(400, `Bad Request`)
    }

    return res.status(201).json(
        new ApiResponse(201, null , "Album updated successfully.")
    )
})  

const deleteAlbumByIdController = asyncHandler(async (req,res) => {
console.log(req.params);

    const { error, value } = validateIdField(req.params.id);

    if(error){
        throw new ApiError(400, `${error}.`)
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
