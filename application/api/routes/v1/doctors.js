const express = require('express');
const logger = require('../../../core/logger');
const doc_router = express.Router();
const {doctor_register} = require('./requests/validators');
const {user_auth_middleware} = require('../../../core/middlewares/auth.middleware');
const doctor_service  = require('../../../doctors/service');

doc_router.post('',doctor_register, async (req, res, next) => {
    try{
    return res.status(201).json({doctor : await doctor_service.create_doc(req) , success: true,
        message: 'Your profile created successfully. Please verify your email to start using.'})

    }catch (error){
        next(error)
    }
});

doc_router.get('', async (req, res, next) => {
    try {
        return res.status(200).json({...await doctor_service.list(req)})
    }catch (error){
    next(error)
}
});


module.exports = doc_router