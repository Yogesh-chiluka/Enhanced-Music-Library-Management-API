import Joi from 'joi';
import { isValidObjectId } from "mongoose"

const validateGrammyHidden = (data) => {

    const schema = Joi.object({
        grammy: Joi.number().optional(),
        hidden: Joi.boolean().optional(),
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
    name: Joi.string().optional(),
    grammy: Joi.number().optional(),
    hidden: Joi.boolean().optional(),
  }).or('name', 'grammy', 'hidden');

  return schema.validate(data);
};

export{
    validateGrammyHidden,
    validateIdField,
    validateNameGrammyHidden
}