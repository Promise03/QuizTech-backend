import joi from 'joi';


const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    username: joi.string().required(),
    password: joi.string().min(7).required(),
    role: joi.string().valid('Admin', 'Student').required(),


})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password:joi.string().required(),
});

export  {registerSchema, loginSchema};