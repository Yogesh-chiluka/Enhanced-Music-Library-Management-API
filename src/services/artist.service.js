import { ApiError } from '../utils/ApiError.js'
import { Artist } from '../models/artist.model.js'

const createArtist = async(name, grammy, hidden) => {

    // const artistExist = await getArtistById(email);
    // if(artistExist){
    //     throw new ApiError(409,"Email already exists.")
    // }

    const artist = await Artist.create({
            name,
            grammy,
            hidden,
    })

    if(!artist){
        throw new ApiError(500, "Something went wrong while registering the artist.")
    }

    return artist;
}

const getArtistById = async(artistId) => {

    const artist = await Artist.findById(artistId);

    return artist;
}

const getAllArtists = async (grammy, hidden, offset, limit) => {

    const pipeline = [];

    if (grammy != null) {
        pipeline.push({
            $match: {
                grammy: grammy
            }
        });
    }

    if (hidden) {
        pipeline.push({
            $match: {
                hidden: hidden
            }
        });
    }

    pipeline.push({
        $project: {
            artist_id: '$_id',
            _id: 0, 
            name: 1,
            grammy: 1,
            hidden: 1,
        }
    });
    
    const artistAggregate = Artist.aggregate(pipeline);

    const page = Math.ceil(parseInt(offset, 10) / parseInt(limit, 10)) + 1;

    const options = {
        page: page,
        limit: parseInt(limit, 10)
    };
       
    const paginatedArtists = await Artist.aggregatePaginate(artistAggregate, options);

    return paginatedArtists;
};

const deleteArtistById = async(artistId) =>{

    const artist = await getArtistById(artistId);

    if(!artist){
        throw new ApiError(404, 'Artist not found');
    }

    await Artist.findByIdAndDelete(artistId);
};

const updateArtistById = async(artistId, name, grammy, hidden) =>{
    
    const artist = await getArtistById(artistId);
    
    if(!artist) {
        throw new ApiError(404,'Artist not found.');
    }

    const updatedArtist = await Artist.findByIdAndUpdate(
        artist._id,
        {
            name,
            grammy,
            hidden
        },
        {new: true}
    )

    return updatedArtist;
};


export {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtistById,
    deleteArtistById,
}