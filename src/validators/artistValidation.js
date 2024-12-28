import Joi from 'joi';
import { isValidObjectId } from "mongoose"

const validateGrammyVisibility = (data) => {

    const schema = Joi.object({
        Grammy: Joi.number().optional(),
        Visibility: Joi.boolean().optional(),
        offset: Joi.number().default(0),
        limit: Joi.number().default(5),
    })
    return schema.validate(data);
}

const validateIdField = (artistId) => {

  const schema = Joi.object({
    artistId: Joi.string().required()
  });

  const { error } = schema.validate({ artistId });

  if (error || !isValidObjectId(artistId) ) {
    return { error: "Bad Request, Reason: Invalid user id", value: null };
  }
  return { error: null, value: { artistId } };
};


const validateNameGrammyHidden = (data) => {

  const schema = Joi.object({
    name: Joi.string().required(),
    grammy: Joi.number().required(),
    hidden: Joi.boolean().required(),
  });

  return schema.validate(data);
};

export{
    validateGrammyVisibility,
    validateIdField,
    validateNameGrammyHidden
}