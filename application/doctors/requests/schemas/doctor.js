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

const DoctorOfficeCreateSchema = Joi.object({
    name: Joi.string().label('Name')
        .min(3)
        .max(30)
        .required(),
    description : Joi.string().label('Description'),
    phone_number : Joi.string().label('Phone Number').regex(/^[0-9]{10}$/)
        .messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    address_line_1: Joi.string().required(),
    address_line_2: Joi.string(),
    zipcode: Joi.string(),
    state: Joi.string(),
    location_mark: Joi.string(),
    location: Joi.object().keys({
        type : Joi.string().label('Location Type').description('Polygon or Point'),
        coordinates : Joi.array().items(Joi.number().precision(8)).length(2)
            .label('Co-ordinates [Latitude & Longitude]'),
    }).and('type', 'coordinates').label('Location on Map'),
    opening_hours : Joi.array().items(Joi.object().keys({
        day : Joi.string().uppercase().valid(...WEEKDAYS),
        closed: Joi.boolean().default(false),
        periods : Joi.object().keys({
            start : Joi.date().required(),
            end : Joi.date().required()
        }).and('start', 'end').label('Must have start and end time')
    })),
    is_active: Joi.string().default(true)
});

// Joi.object({
//     type: Joi.string()
//         .required()
//         .valid(["Point"]),
//     coordinates: Joi.array().ordered([
//         Joi.number()
//             .min(-180)
//             .max(180)
//             .required(),
//         Joi.number()
//             .min(-90)
//             .max(90)
//             .required()
//     ])
// }).description("Please use this format [ longitude, latitude]"),

module.exports = {
    DoctorCreateSchema,
    DoctorOfficeCreateSchema
}
