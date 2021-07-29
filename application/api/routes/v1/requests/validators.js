const {PostRequestMiddleware} = require('../../../../core/middlewares/requests.middleware')
const AuthRequestSchema = require('../../../../auth/requests/schemas/auth')
const DoctorSchema = require('../../../../doctors/requests/schemas/doctor');

exports.register_schema = PostRequestMiddleware(AuthRequestSchema.RegisterSchema, 'body')
exports.forgot_password_schema = PostRequestMiddleware(AuthRequestSchema.ForgotPasswordSchema, 'body')
exports.login_schema = PostRequestMiddleware(AuthRequestSchema.LoginSchema, 'body')
exports.change_password = PostRequestMiddleware(AuthRequestSchema.ChangePasswordSchema , 'body')
exports.reset_password = PostRequestMiddleware(AuthRequestSchema.ResetPasswordSchema , 'body')
exports.doctor_register = PostRequestMiddleware(DoctorSchema.DoctorCreateSchema , 'body')
