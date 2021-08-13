const express = require('express');
const logger = require('../../../core/logger');
const doc_router = express.Router();
const {doctor_register, doctor_add_office} = require('./requests/validators');
const {user_auth_middleware, doc_auth_middleware} = require('../../../core/middlewares/auth.middleware');
const doctor_service = require('../../../doctors/service');


doc_router.post('', doctor_register, async (req, res, next) => {
    try {
        return res.status(201).json({
            doctor: await doctor_service.create_doc(req), success: true,
            message: 'Your profile created successfully. Please verify your email to start using.'
        })

    } catch (error) {
        next(error)
    }
});

doc_router.get('', async (req, res, next) => {
    try {
        return res.status(200).json({...await doctor_service.list(req)})
    } catch (error) {
        next(error)
    }
});


doc_router.get('/profile', doc_auth_middleware, async (req, res, next) => {
    try {
        return res.status(200).json(req.doctor)
    } catch (error) {
        next(error)
    }
});

doc_router.post('/:doctor/add-office', doc_auth_middleware, doctor_add_office, async (req, res, next) => {
    try {
        return res.status(201).json({success: true, doctor: await doctor_service.add_office_to_doctor(req, req.doctor)})
    } catch (error) {
        next(error)
    }
});

doc_router.get('/verify/:verify_token/:random_hash', async (req, res, next) => {
    try {
        let is_verified = await doctor_service.verify_email_address(req.params['verify_token'])
        res.json(
            {success: !!is_verified}
        )
    } catch (err) {
        next(err)
    }
})

module.exports = doc_router
