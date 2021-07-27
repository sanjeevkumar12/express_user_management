const GeneralError = require('./throwable');

const handleErrors = (err, req, res, next) => {
    console.log(err)
    if (err.name === 'GeneralError') {
        res.status(err.getCode()).json(err.getResponseData());
    }else {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
    next();
}

module.exports = handleErrors;