const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$')).required().messages({
        'string.empty': 'Password is required',
        'string.pattern.base': 'Password must be at least 8 characters long and include at least one uppercase letter, one special character, and one number',
    }),
    role: Joi.string().required().messages({
        'string.empty': 'Role is required',
    }),
});


const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
    }),
});

module.exports = {registerSchema,loginSchema};