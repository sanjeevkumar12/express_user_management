const express = require('express');
const api_router = express.Router()
const api_router_v1 = require('./v1')
api_router.get('', (req, res, next)=>{
    res.send({
        'API' : req.baseUrl + req.path
    })
})
api_router.use('/v1', api_router_v1)
module.exports = api_router