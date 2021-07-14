const express = require('express');
const logger = require('../../../core/logger');
const auth_router = express.Router();
const {register_schema} = require('./requests/validators');
const auth_service  = require('../../../auth/service');
const {send_user_verification_email} = require('../../../auth/emails')


auth_router.get('', (req, res, next)=>{
    res.send({
        'API' : req.baseUrl + req.path
    })
})

auth_router.post('/register', register_schema, async (req, res, next) => {
    try{
        let user = await auth_service.create_user(req.validate_data || req.body)
        await send_user_verification_email(req, user)
        res.status(201).json({user
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

module.exports = auth_router