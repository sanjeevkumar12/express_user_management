const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const settings = require('../config')
const {MEDICAL_SPECIALTIES, WEEKDAYS , AVAILABLE_SERVICES} = require('./constants')

const doctorQualificationSchema = mongoose.Schema({
    name: String,
    institute: String,
    year_of_passing : Date
},{
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})

const doctorOfficeSchema = mongoose.Schema({
        name: String,
        description: {
            required: false,
            type: String
        },
        phone_number: String,
        email: {
            type: String,
            required: false,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        address_line_1 : {
           type: String,
           require: true
        } ,
        address_line_2 : {
            type: String,
            require: false
        },
        zipcode : {
            type: String,
            require: true
        },
        state: {
          type: String,
          require: true,
        },
        location_mark : {
          type : String,
          required: false
        },
        location: {
            required: false,
            type: {
                type: String,
                enum: ['Point'],
                required: false
            },
            coordinates: {
                type: [Number],
                required: false
            },
        },
        is_active: {
            type: Boolean,
            default: false
        },
        opening_hours: [{
            day: WEEKDAYS,
            closed: Boolean,
            periods: {
                start: {type: Date},
                end: {type: Date}
            }
        }],
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
            }
        }
    }
)

doctorOfficeSchema.index({ "location": "2dsphere" });

/**
 * @description Doctor Model Schema
 * @param doctorSchema mongoose.Schema
 */
const doctorSchema = mongoose.Schema({
        license: {
            type: String,
            unique: true
        },
        user : {type: mongoose.Schema.Types.ObjectId,ref: 'users'},
        phone_number: String,
        avatar: {
            data: Buffer,
            contentType: String
        },
        available_service: [AVAILABLE_SERVICES],
        medical_specialities: [MEDICAL_SPECIALTIES],
        educations : [
            doctorQualificationSchema
        ],
        email: {
            type: String,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        date_of_birth: {
            type: Date,
            required: false
        },
        offices: [doctorOfficeSchema]
    }, {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
            }
        }
    }
)
doctorSchema.statics.findByToken = async function (token) {
    let Doctor = this;
    let token_data = await jwt.verify(token, settings.JWT_SETTINGS.secret)
    return Doctor.findOne({"user": token_data.id}).populate('user')
};



/**
 * @description Create User Token
 * @returns string
 */

doctorSchema.methods.add_office = async function (data) {
    let office_address = new DoctorOffice(data)
    this.offices.push(office_address)
    return this.save()
};



const Doctor = mongoose.model('doctors', doctorSchema);
const DoctorQualification = mongoose.model('doctor_qualifications', doctorQualificationSchema)
const DoctorOffice = mongoose.model('doctor_offices', doctorOfficeSchema)

module.exports = {
    Doctor,
    DoctorQualification,
    DoctorOffice
}
