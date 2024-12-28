import Joi from 'joi';
import { isValidObjectId } from "mongoose"


const validateArtistHiddenArtistId = (data) => {

    const schema = Joi.object({
      name: Joi.string().required(),
      year: Joi.number().required(),
      hidden: Joi.boolean().required(),
      artist_id: Joi.string().required()
    })

    const { error, value } = schema.validate(data);

    if (error || !isValidObjectId(value.artist_id) ) {
      return { error: "Bad Request, Reason: Invalid artist_id", value: null };
    }

  return { error, value };
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
      artist_id: Joi.string().optional(),
      hidden: Joi.boolean().optional(),
      offset: Joi.number().default(0),
      limit: Joi.number().default(5),
    });
  
  const { error, value } = schema.validate(data);

  if(!error && value.artist_id != null){
    if (!isValidObjectId(value.artist_id)) {
      return { error: "Bad Request, Reason: Invalid artist_id", value: null };
    }
  }

  return { error, value };
};

export{
  validateArtistHiddenArtistId,
  validateIdField,
  validateArtistHidden
}


  