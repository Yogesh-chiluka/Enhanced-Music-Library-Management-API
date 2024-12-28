import Joi from 'joi';
import { isValidObjectId } from "mongoose"

const roles = ['artist','track','album']

const validateFilterFields = (data) => {

  const schema = Joi.object({
    category: Joi.string().valid(...roles).required(),
    offset: Joi.number().default(0),
    limit: Joi.number().default(5),
  });

return schema.validate(data);
}

const validateAddFavoriteFields = (data) => {
  
    const schema = Joi.object({
      category: Joi.string().valid(...roles).required(),
      item_id: Joi.string().required(),
    })

    const { error, value } = schema.validate(data);

    if (error || !isValidObjectId(value.item_id)) {
      return { error: `Invalid ObjectId`, value: null };
    }

  return { error, value };
}


const validateIdField = (id) => {

  const schema = Joi.object({
    id: Joi.string().required()
  });

  const { error } = schema.validate({ id });

  if (error || !isValidObjectId(id) ) {
    return { error: "Invalid id", value: null };
  }
  return { error: null, value: { id } };
};




export{
  validateFilterFields,
  validateIdField,
  validateAddFavoriteFields,
}


  