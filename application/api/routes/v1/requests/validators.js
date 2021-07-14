const {PostRequestMiddleware} = require('../../../../core/middlewares/requests.middleware')
const AuthRequestSchema = require('../../../../auth/requests/schemas/auth')

exports.register_schema = PostRequestMiddleware(AuthRequestSchema.RegisterSchema, 'body')
