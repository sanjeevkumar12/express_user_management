const Joi = require('joi');
const {valid_password} = require('../../../core/helpers/validator')

const RegisterSchema = Joi.object({
    first_name: Joi.string().label('First Name')
        .min(3)
        .max(30)
        .required(),

    last_name: Joi.string().label('Last Name')
        .min(3)
        .max(30)
        .required(),

    password: Joi.string().min(6).required().custom((value, helpers)=>{
        if (!valid_password(value)){
            return helpers.message('Password must be a minimum of 6 characters including number, Upper, Lower And  one special character')
        }
        return value
    }).label('Password').strict(),

    confirm_password: Joi.string().required().label('Confirm Password').valid(Joi.ref('password')).messages({
        'any.only': '{{#label}} does not match'
    }).strict(),


    email: Joi.string().label('Email').required()
        .email()
}).options({ abortEarly: false })

const LoginSchema = Joi.object({
    password: Joi.string().required().label('Password'),
    email: Joi.string().label('Email').required()
        .email()
}).options({ abortEarly: false })


const ForgotPasswordSchema = Joi.object({
    email: Joi.string().label('Email').required()
        .email(),
    client_url: Joi.string().label('Callback URL').required()
        .uri()
}).options({ abortEarly: false })

const ChangePasswordSchema = Joi.object({
    current_password: Joi.string().required().label('Current Password')
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).strict(),
    new_password: Joi.string().required().custom((value, helpers)=>{
        if (!valid_password(value)){
            return helpers.message('Password must be a minimum of 6 characters including number, Upper, Lower And  one special character')
        }
        return value
    }).label('New Password').strict(),
    confirm_password: Joi.string().required().label('Confirm Password').valid(Joi.ref('new_password')).messages({ 'any.only': '{{#label}} does not match' }).strict(),
}).options({ abortEarly: false })


const ResetPasswordSchema = Joi.object({
    new_password: Joi.string().required().custom((value, helpers)=>{
        if (!valid_password(value)){
            return helpers.message('Password must be a minimum of 6 characters including number, Upper, Lower And  one special character')
        }
        return value
    }).label('New Password').strict(),
    confirm_password: Joi.string().required().label('Confirm Password').valid(Joi.ref('new_password')).messages({ 'any.only': '{{#label}} does not match' }).strict(),
}).options({ abortEarly: false })


module.exports = {
    RegisterSchema,
    LoginSchema,
    ChangePasswordSchema,
    ForgotPasswordSchema,
    ResetPasswordSchema
}
