import { ApiError } from '../utils/ApiError.js'
import { Track } from '../models/track.model.js'
import mongoose from 'mongoose';



const getAllTracks = async(artist_id, album_id, hidden, offset, limit) => {

    
    const pipeline = [];
    
        if (artist_id) {
            pipeline.push({
                $match: {
                    artist: new mongoose.Types.ObjectId(artist_id)
                }
            })
        }

        if (album_id) {
            pipeline.push({
                $match: {
                    artist: new mongoose.Types.ObjectId(album_id)
                }
            })
        }

        if (hidden) {
            pipeline.push({
                $match: {
                    hidden:hidden
                }
            });
        }
    // write aggregations
        pipeline.push({
                $lookup: {
                    from: 'artists',
                    localField: 'artist',
                    foreignField: '_id',
                    as: 'artist',
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
                  $unwind: '$artist'
            },
            {
                $lookup: {
                    from: 'albums',
                    localField: 'album',
                    foreignField: '_id',
                    as: 'album',
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
                  $unwind: '$album'
            },
            {
            $project: {
                track_id: '$_id',
                _id: 0, 
                artist_name: '$artist.name',
                name: 1,
                album_name:'$album.name',
                duration: 1,
                hidden: 1,
            }
        });
        
        const trackAggregate = Track.aggregate(pipeline);
    
        const page = Math.ceil(parseInt(offset, 10) / parseInt(limit, 10)) + 1;
    
        const options = {
            page: page,
            limit: parseInt(limit, 10)
        };
           
        const paginatedTracks = await Track.aggregatePaginate(trackAggregate, options);
    
    return paginatedTracks;
}

const getTrackById = async(trackId) => {
    
    //const track = await Track.findById(trackId);

    const pipeline = [{
            $match: {
                _id: new mongoose.Types.ObjectId(trackId)
            }
        },
        {
            $lookup: {
                from: 'artists',
                localField: 'artist',
                foreignField: '_id',
                as: 'artist',
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
              $unwind: '$artist'
        },
        {
            $lookup: {
                from: 'albums',
                localField: 'album',
                foreignField: '_id',
                as: 'album',
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
              $unwind: '$album'
        },
        {
        $project: {
            track_id: '$_id',
            _id: 0, 
            artist_name: '$artist.name',
            name: 1,
            album_name:'$album.name',
            duration: 1,
            hidden: 1,
        }
    }]

    const trackAggregate = await Track.aggregate(pipeline);
    
    return trackAggregate[0];
}

const createTrack = async( artist_id, album_id, name, duration, hidden) => {

    const track = await Track.create({
        artist:artist_id,
        album:album_id,
        name,
        duration,
        hidden,
    })
    
    if(!track){
        throw new ApiError(500, "Something went wrong while registering the track.")
    }
    
    return track;
}

const updateTrackById = async(trackId, update) => {
    
    const track = await getTrackById(trackId);
        
    if(!track) {
        throw new ApiError(404,'Track not found.');
    }
    
    const updatedTrack = await Track.findByIdAndUpdate(
        track.track_id,
        { 
          $set: update 
        },
        { new: true } // Return the updated document
    );

    return updatedTrack;
}

const deleteTrackById = async(trackId) => {
    
    const track = await getTrackById(trackId);
    //console.log(track)
    if(!track[0]){
        throw new ApiError(404, 'Track not found');
    }

    await Track.findByIdAndDelete(track[0].track_id);
    
    return track;
}



export {
    getAllTracks,
    getTrackById,
    createTrack,
    updateTrackById,
    deleteTrackById,
}