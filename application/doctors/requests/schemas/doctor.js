const Joi = require('joi');
const {MEDICAL_SPECIALTIES, WEEKDAYS, AVAILABLE_SERVICES} = require('../../constants')
const {valid_password} = require('../../../core/helpers/validator')

const DoctorCreateSchema = Joi.object({
    license: Joi.string().label('Licence')
        .min(3)
        .max(30)
        .required(),

    phone_number: Joi.string().label('Phone Number')
        .min(3)
        .max(30)
        .required(),
    available_service : Joi.array().label('Services Offered').items(Joi.string().valid(...AVAILABLE_SERVICES)).required(),
    medical_specialities:Joi.array().label('Medical Specialities').items(Joi.string().valid(...MEDICAL_SPECIALTIES)).required(),
    date_of_birth: Joi.date().required().label('Date of Birth').options({convert: true}),
    first_name: Joi.string().label('First Name')
        .min(3)
        .max(30)
        .required(),
    last_name: Joi.string().label('Last Name')
        .min(3)
        .max(30)
        .required(),
    password: Joi.string().min(3).max(15).required().custom((value, helpers)=>{
        if (!valid_password(value)){
            return helpers.message('Password must be a minimum of 6 characters including number, Upper, Lower And  one special character')
        }
        return value
    }).label('Password'),
    confirm_password: Joi.any().equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
    email: Joi.string().label('Email').required()
        .email()
}).options({abortEarly: false})

module.exports = {
    DoctorCreateSchema
}