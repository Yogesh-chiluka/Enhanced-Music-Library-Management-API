import Joi from 'joi';
import { isValidObjectId } from "mongoose"

// User Validations 
const validateEmailPasswordFields = (data) => 
{
    const schema = Joi.object({
        email: Joi.string().pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).min(3).max(50).required(),
        password: Joi.string().min(6).required(),
    })
    
    return schema.validate(data);
}


const validateIdField = (userId) => {

  const schema = Joi.object({
    userId: Joi.string().required()
  });

  const { error } = schema.validate({ userId });

  if (error || !isValidObjectId(userId) ) {
    return { error: "Bad Request, Reason: Invalid user id", value: null };
  }
  return { error: null, value:{userId} };
};

const roles = [
    'EDITOR',
    'VIEWER'
]

const validateEmailPasswordRoleFields = (data) => 
    {

        const schema = Joi.object({
            email: Joi.string().pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).min(3).max(50).required(),
            password: Joi.string().min(6).required(),
            role: Joi.string().valid(...roles).required()
        })

        const { role } = data;
        console.log(role+'validate');
        data.role = data.role.toUpperCase();
        console.log(data.role+'validate uppercase');
        return schema.validate(data);
    }

const validateOldNewPasswordFields = (data) => 
    {

        const schema = Joi.object({
            old_password: Joi.string().min(6).required(),
            new_password: Joi.string().min(6).required(),
        })

        return schema.validate(data);
    }

const validateFilterFields = (data) => 
    {
    
        const schema = Joi.object({
            role: Joi.string().valid(...roles).optional(),
            offset: Joi.number().default(0).optional(),
            limit: Joi.number().default(5).optional(),
        })
    
    if(data.role){
        data.role = data.role.toUpperCase();
    }  
    return schema.validate(data);
}


export{
    validateEmailPasswordRoleFields,
    validateEmailPasswordFields,
    validateIdField,
    validateOldNewPasswordFields,
    validateFilterFields

}