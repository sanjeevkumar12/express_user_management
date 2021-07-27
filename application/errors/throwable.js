class GeneralError extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.name = 'GeneralError';
    }

    getCode() {
        if (this instanceof BadRequest) {
            return 400;
        } if (this instanceof NotFound) {
            return 404;
        }
        if (this instanceof ValidationError) {
            return 422;
        }
        if (this instanceof PermissionDenied) {
            return 403;
        }
        return 500;
    }

    getResponseData(){
        return {
            status: 'error',
            message: this.message
        }
    }
}

class ValidationError extends GeneralError {

    getResponseData() {
        return {errors: this.message, success: false};
    }

}

class BadRequest extends ValidationError {

}

class NotFound extends GeneralError {

}

class PermissionDenied extends GeneralError {

}

module.exports = {
    GeneralError,
    BadRequest,
    NotFound,
    ValidationError,
    PermissionDenied
};
