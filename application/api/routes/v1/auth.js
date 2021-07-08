const express = require('express');
const auth_router = express.Router()
auth_router.get('', (req, res, next)=>{
    res.send({
        'API' : req.baseUrl + req.path
    })
})
module.exports = auth_router