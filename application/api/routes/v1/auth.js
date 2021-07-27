const express = require('express');
const logger = require('../../../core/logger');
const auth_router = express.Router();
const {register_schema, forgot_password_schema , login_schema} = require('./requests/validators');
const {user_auth_middleware} = require('../../../core/middlewares/auth.middleware');
const auth_service  = require('../../../auth/service');
const { send_user_verification_email, } = require('../../../auth/emails')


auth_router.get('', (req, res, next)=>{
    res.send({
        'API' : req.baseUrl + req.path
    })
})

auth_router.post('/register', register_schema, async (req, res, next) => {
    try{
        let user = await auth_service.create_user(req)

        let message = 'Please check your email to verify your email address.'
        res.status(201).json({user, message
            , success: true})
    }catch (error){
        next(error)
    }
})

auth_router.post('/login', login_schema, async (req, res, next) => {
    try{
        let login_data = await auth_service.login_user(req)
        res.status(201).json({...login_data
            , success: true})
    }catch (error){
        next(error)
    }
})


auth_router.get('/verify/:verify_token/:random_hash', async (req, res, next) => {
    try {
        let is_verified = await auth_service.verify_email_address(req.params['verify_token'])
        res.json(
            {success: !!is_verified}
        )
    }catch (err){
       next(err)
    }
})

auth_router.get('/forgot-password', forgot_password_schema, async (req, res, next) => {
    try {
        let is_verified = await auth_service.verify_email_address(req.params['verify_token'])
        res.json(
            {success: !!is_verified}
        )
    }catch (err){
        next(err)
    }
})

auth_router.get('/forgot-password/:token_hash/reset', async (req, res, next) => {
    try {
        let is_verified = await auth_service.verify_email_address(req.params['verify_token'])
        res.json(
            {success: !!is_verified}
        )
    }catch (err){
        next(err)
    }
})

auth_router.get('/me', user_auth_middleware, async (req, res, next) => {
    return req.user
})

module.exports = auth_router