import Joi from 'joi';
import { isValidObjectId } from "mongoose"


const validateAddTrackFields = (data) => {

    const schema = Joi.object({
      album_id: Joi.string().required(),
      artist_id: Joi.string().required(),
      name: Joi.string().required(),
      duration: Joi.number().required(),
      hidden: Joi.boolean().required(),
    })

    const { error, value } = schema.validate(data);

    if (error || !isValidObjectId(value.album_id) || !isValidObjectId(value.artist_id)) {
      return { error: `Bad Request, Reason: Invalid ObjectId`, value: null };
    }

  return { error, value };
}

const validateFilterFields = (data) => {

  const schema = Joi.object({
    artist_id: Joi.string().optional(),
    hidden: Joi.boolean().optional(),
    offset: Joi.number().default(0),
    limit: Joi.number().default(5),
  });

return schema.validate(data);
}

const validateUpdateFields = (data) => {

  const schema = Joi.object({
    name: Joi.string().optional(),
    duration: Joi.number().optional(),
    hidden: Joi.boolean().optional(),
  }).or('name', 'duration', 'hidden');

  return schema.validate(data);
}


const validateIdField = (id) => {

  const schema = Joi.object({
    id: Joi.string().required()
  });

  const { error } = schema.validate({ id });

  if (error || !isValidObjectId(id) ) {
    return { error: "Bad Request, Reason: Invalid user id", value: null };
  }
  return { error: null, value: { id } };
};


const validateArtistHidden = (data) => {

  const schema = Joi.object({
    album_id: Joi.string().optional(),
    artist_id: Joi.string().optional(),
    hidden: Joi.boolean().optional(),
    offset: Joi.number().default(0),
    limit: Joi.number().default(5),
  });

  const { error, value } = schema.validate(data);

  if (!error && value.artist_id != null) {
    if (!isValidObjectId(value.artist_id)) {
      return { error: "Bad Request, Reason: Invalid artist_id", value: null };
    }
  }

  if (!error && value.album_id != null) {
    if (!isValidObjectId(value.album_id)) {
      return { error: "Bad Request, Reason: Invalid album_id", value: null };
    }
  }

  return { error, value };
};


export{
  validateAddTrackFields,
  validateIdField,
  validateFilterFields,
  validateUpdateFields,
}


  