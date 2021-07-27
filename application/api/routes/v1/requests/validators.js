const {PostRequestMiddleware} = require('../../../../core/middlewares/requests.middleware')
const AuthRequestSchema = require('../../../../auth/requests/schemas/auth')

exports.register_schema = PostRequestMiddleware(AuthRequestSchema.RegisterSchema, 'body')
exports.forgot_password_schema = PostRequestMiddleware(AuthRequestSchema.ForgotPasswordSchema, 'body')
exports.login_schema = PostRequestMiddleware(AuthRequestSchema.LoginSchema, 'body')
