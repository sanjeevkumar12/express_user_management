exports.debugreq = (req, res, next) => {
    res.send({
        'API' : req.baseUrl + req.path
    })
    next()
}