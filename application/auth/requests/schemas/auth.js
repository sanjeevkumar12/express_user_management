const Joi = require('joi');

const RegisterSchema = Joi.object({
    first_name: Joi.string().label('First Name')
        .min(3)
        .max(30)
        .required(),

    last_name: Joi.string().label('Last Name')
        .min(3)
        .max(30)
        .required(),

    password: Joi.string().required().label('Password')
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).strict(),

    confirm_password: Joi.string().required().label('Confirm Password').valid(Joi.ref('password')).strict(),


    email: Joi.string().label('Email').required()
        .email()
}).options({ abortEarly: false })

const LoginSchema = Joi.object({
    password: Joi.string().required().label('Password')
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).strict(),
    email: Joi.string().label('Email').required()
        .email()
}).options({ abortEarly: false })


const ForgotPasswordSchema = Joi.object({
    email: Joi.string().label('Email').required()
        .email()
}).options({ abortEarly: false })

const ChangePasswordSchema = Joi.object({
    current_password: Joi.string().required().label('Current Password')
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).strict(),
    new_password: Joi.string().required().label('New Password')
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).strict(),
    confirm_password: Joi.string().required().label('Confirm Password').valid(Joi.ref('new_password')).strict(),
}).options({ abortEarly: false })


const ResetPasswordSchema = Joi.object({
    new_password: Joi.string().required().label('New Password')
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).strict(),
    confirm_password: Joi.string().required().label('Confirm Password').valid(Joi.ref('new_password')).strict(),
}).options({ abortEarly: false })


module.exports = {
    RegisterSchema,
    LoginSchema,
    ChangePasswordSchema,
    ForgotPasswordSchema,
    ResetPasswordSchema
}