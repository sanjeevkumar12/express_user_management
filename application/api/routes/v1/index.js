const express = require('express');
const auth_router = require('./auth');
const api_router_v1 = express.Router()
api_router_v1.get('', (req, res, next)=>{
    res.send({
        'API' : req.baseUrl + req.path
    })
})
api_router_v1.use('/auth', auth_router)
module.exports = api_router_v1