const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

const base_dir  = path.dirname(__dirname)
const application_dir = path.join(base_dir, 'application')

const email_template_dir = path.join(application_dir, 'views' , 'emails')

dotenv.config({path: path.join(base_dir, '.env')});


const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_CONNECTION_STRING: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
        .default(10)
        .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
        .default(10)
        .description('minutes after which verify email token expires'),
    SMTP_EMAIL_HOST: Joi.string().description('server that will send the emails'),
    SMTP_EMAIL_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_EMAIL_USERNAME: Joi.string().description('username for email server'),
    SMTP_EMAIL_PASSWORD: Joi.string().description('password for email server'),
    DEFAULT_EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
})
    .unknown();

const {value: envVars, error} = envVarsSchema.prefs({errors: {label: 'key'}}).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    APP_ENV: envVars.NODE_ENV,
    APP_PORT: envVars.PORT,
    APPLICATION_DIR : application_dir,
    BASE_DIR : base_dir,
    MONGODB_CONF: {
        CONNECTION_STRING: envVars.MONGODB_CONNECTION_STRING + (envVars.NODE_ENV === 'test' ? '-test' : ''),
        OPTIONS: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true
        },
    },
    JWT_SETTINGS: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    EMAIL_SETTINGS: {
        smtp: {
            host: envVars.SMTP_EMAIL_HOST,
            port: envVars.SMTP_EMAIL_PORT,
            auth: {
                user: envVars.SMTP_EMAIL_USERNAME,
                pass: envVars.SMTP_EMAIL_PASSWORD,
            },
            secure: false
        },
        template_dir: email_template_dir,
        from: envVars.DEFAULT_EMAIL_FROM,
    }
};