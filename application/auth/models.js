const mongoose = require('mongoose');
const settings = require('../config')
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const {NotFound} = require('../errors/throwable');


/**
 * @description User Model Schema
 * @param UserSchema mongoose.Schema
 */
const UserSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
        },
        last_name: {
            type: String,
            required: false,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number');
                }
            },
            private: true, // used by the toJSON plugin
        },
        is_email_verified: {
            type: Boolean,
            default: false,
        },
        is_super_admin: {
            type: Boolean,
            default: false,
        },
        is_active: {type: Boolean, required: false, default: false},
        is_blocked: {type: Boolean, required: false, default: false}
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
                delete ret.password
            }
        }
    }
)


/**
 * @description User Pre save hook
 */
UserSchema.pre('save', async function(next){
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    next();
});



/**
 * @description Compare User Password
 * @param password string
 * @returns boolean
 */
UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


/**
 * @description Create User Token
 * @returns string
 */

UserSchema.methods.generateJWT = async function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return await jwt.sign({
        id: this._id,
        email: this.email,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: parseInt(exp.getTime() / 1000),
    }, settings.JWT_SETTINGS.secret);
};

/**
 * @description Create User Token
 * @param token string
 * @returns UserSchema
 */

UserSchema.statics.findByToken = async (token) => {
    let User = this;
    let token_data = await jwt.verify(token, settings.JWT_SETTINGS.secret)
    return await User.findOne({"_id": token_data.id})
};


/**
 * @description Verify user
 * @param token string
 * @returns UserSchema|null
 */

UserSchema.statics.verify_email = async function(token) {
    let token_data = await jwt.verify(token, settings.JWT_SETTINGS.secret)
    if (!token_data.id || token_data.type === 'verify_email'){
        throw new NotFound('The given token is either invalid or expired.');
    }
    let user = await this.findOne({"_id": token_data.id})
    if(user && user.is_email_verified===false && token_data.type === 'verify_email'){
        user.is_email_verified = true;
        await user.save()
        return user
    }
    return false
};






/**
 * @description Get User By Email
 * @param email string
 * @returns UserSchema
 */

UserSchema.statics.findByEmail = async function (email) {
    const User = this;
    return await User.findOne({"email": email});
};

/**
 * @description Create User Token
 * @returns string
 */
UserSchema.methods.generateResetPasswordToken = async function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + settings.JWT_SETTINGS.resetPasswordExpirationMinutes);
    return await jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
        iat: Math.floor(Date.now() / 1000) - 30,
    }, settings.JWT_SETTINGS.secret);
}

UserSchema.methods.verification_link = async function(req) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + settings.JWT_SETTINGS.resetPasswordExpirationMinutes);
    let jwt_token = await jwt.sign({
        id: this._id,
        email: this.email,
        type: 'verify-email',
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: parseInt(exp.getTime() / 1000),
    }, settings.JWT_SETTINGS.secret);
    let host = req.protocol+"://"+req.get('host')
    let random_hash = new Date().getTime();
    return `${host}${req.baseUrl}/verify/${jwt_token}/${random_hash}`;

}

exports.User = mongoose.model('users', UserSchema);
