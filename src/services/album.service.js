import { ApiError } from '../utils/ApiError.js'
import { Album } from '../models/album.model.js'
import mongoose from 'mongoose';



const getAllAlbums = async(artist_id, hidden, offset, limit) => {

    
    const pipeline = [];
    
        if (artist_id) {
            pipeline.push({
                $match: {
                    artist: new mongoose.Types.ObjectId(artist_id)
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
            $project: {
                album_id: '$_id',
                _id: 0, 
                artist_name: '$artist.name',
                name: 1,
                year: 1,
                hidden: 1,
            }
        });
        
        const albumAggregate =  Album.aggregate(pipeline);
    
        const page = Math.ceil(parseInt(offset, 10) / parseInt(limit, 10)) + 1;
    
        const options = {
            page: page,
            limit: parseInt(limit, 10)
        };
           
        const paginatedAlbums = await Album.aggregatePaginate(albumAggregate, options);
    
    return paginatedAlbums;
}

const getAlbumById = async(albumId) => {
    
    //const album = await Album.findById(albumId);

    const pipeline = [{
            $match: {
                _id: new mongoose.Types.ObjectId(albumId)
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
        $project: {
            album_id: '$_id',
            _id: 0, 
            artist_name: '$artist.name',
            name: 1,
            year: 1,
            hidden: 1,
        }
    }]

    const albumAggregate = await Album.aggregate(pipeline);
    
    return albumAggregate;
}

const createAlbum = async( artist_id, name, year, hidden) => {

    const album = await Album.create({
        artist:artist_id,
        name,
        year,
        hidden,
    })
    
    if(!album){
        throw new ApiError(500, "Something went wrong while registering the album.")
    }
    
    return album;
}

const updateAlbumById = async(albumId, name, grammy) => {
    
    const album = await getAlbumById(albumId);
        
    if(!album) {
        throw new ApiError(404,'Album not found.');
    }
    
    const updatedAlbum = await Album.findByIdAndUpdate
    (
        album._id,
        {
            name,
            grammy,
            hidden
        },
        {new: true}
    )
    
    return updatedAlbum;
}

const deleteAlbumById = async(albumId) => {
    
    const album = await getAlbumById(albumId);
    //console.log(album)
    if(!album[0]){
        throw new ApiError(404, 'Album not found');
    }

    await Album.findByIdAndDelete(album[0].album_id);
    
    return album;
}



export {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbumById,
    deleteAlbumById,
}