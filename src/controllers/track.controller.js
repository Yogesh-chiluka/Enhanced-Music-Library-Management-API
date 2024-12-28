import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

import {
    getAllTracks,
    getTrackById,
    createTrack,
    updateTrackById,
    deleteTrackById,
} from '../services/track.service.js'

import { 
    validateAddTrackFields,
    validateIdField,
    validateFilterFields,
    validateUpdateFields,
    

} from '../validators/trackValidation.js'


//check
const getAllTracksController = asyncHandler(async (req,res) => {

    const { error, value } = validateFilterFields(req.query);

    if( error ){
        throw new ApiError(400, `Bad Request, Reason: ${error}`)
    }

    const allTracks = await getAllTracks( value.artist_id, value.hidden, value.offset, value.limit).catch( (err)=>{
        throw new ApiError(400, err.message)
    })

    return res.status(200).json(
        new ApiResponse(200, allTracks.docs, "Tracks retrieved successfully.")
    )
})  
//check
const getTrackByIdController = asyncHandler(async (req,res) => {

    const { error, value } = validateIdField(req.params.id);

    if( error ){
        throw new ApiError(400, `Bad Request, Reason: ${error}`)
    }
   
    const track = await getTrackById(value.id);
    
    return res.status(200).json(
        new ApiResponse(200, track, "Tracks retrieved successfully.")
    )
})  

const addTrackController = asyncHandler(async (req,res) => {
    
    const { error, value } = validateAddTrackFields(req.body);
    
    if(error){
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }

    const track = await createTrack( value.artist_id, value.album_id, value.name, value.duration, value.hidden);
    
    //await getTrackById(track._id);

    return res.status(201).json(
        new ApiResponse(201, null , "Track created successfully.")
    )
})  

// check for single field update
const updateTrackByIdController = asyncHandler(async (req,res) => {

    const idValidation = validateIdField(req.params?.id);

    const bodyValidation = validateUpdateFields(req.body);

    if(idValidation.error || bodyValidation.error){
        const error = idValidation.error ? idValidation.error : bodyValidation.error;
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }

    const track = await updateTrackById(idValidation.value.id,bodyValidation.value);

    return res.status(201).json(
        new ApiResponse(201, null , "Track updated successfully.")
    )
})  

const deleteTrackByIdController = asyncHandler(async (req,res) => {

    const { error, value } = validateIdField(req.params.id);

    if(error){
        throw new ApiError(400, `Bad Request, Reason: ${error}.`)
    }

    const track = await deleteTrackById(value.id);

    
    return res.status(200).json(
        new ApiResponse(200, null , `Track: ${track[0].name} deleted successfully.`)
    )
})  



export {
    getAllTracksController,
    getTrackByIdController,
    addTrackController,
    updateTrackByIdController,
    deleteTrackByIdController
} 
