const mongoose = require('mongoose');
const settings = require('../config')

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
        is_active: {type: Boolean, required: false, default: false},
        is_blocked: {type: Boolean, required: false, default: false},
    },
    {
        timestamps: true,
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

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        id: this._id,
        email: this.email,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: parseInt(exp.getTime() / 1000),
    }, config.TOKEN_SECRET);
};

UserSchema.statics.findByToken = async function (token) {
    let token_data = await jwt.verify(token, config.TOKEN_SECRET)
    return await User.findOne({"_id": token_data.id})
};

UserSchema.statics.findByEmail = function (email, callBack) {
    const user = this;
    user.findOne({"email": email}, (err, user) => {
        if (err) return callBack(err);
        callBack(null, user);
    });
};

UserSchema.methods.generateResetPasswordToken = () => {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
        iat: Math.floor(Date.now() / 1000) - 30,
    }, config.TOKEN_SECRET);
}

const UserModel = mongoose.model('users', UserSchema);
module.exports = [UserSchema]