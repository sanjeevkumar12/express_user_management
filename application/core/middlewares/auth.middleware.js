const auth_service  = require('../../auth/service');
const doctor_service = require('../../doctors/service')
const {PermissionDenied} = require('../../errors/throwable')



const UserAuthenticationMiddleware = () => {
    return async (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            req.token = bearer[1];
            let user = await auth_service.get_user_from_token(req.token)
            if (user && user.is_email_verified && user.is_active && !user.is_blocked){
                req.user = user
                next();
            }else{
                res.status(403).json({errors: 'You are not authorised to view this page', success: false})
            }
        }else{
            res.status(403).json({errors: 'Authentication failed auth token not provided', success: false})
        }
    }
}


const DoctorAuthenticationMiddleware = () => {
    return async (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            req.token = bearer[1];
            let doctor = await doctor_service.get_doctor_from_token(req.token)
            if (doctor && doctor.user && doctor.user.is_email_verified && doctor.user.is_active && !doctor.user.is_blocked){
                req.user = doctor.user
                req.doctor = doctor
                next();
            }else{
                res.status(403).json({errors: 'You are not authorised to view this page', success: false})
            }
        }else{
            res.status(403).json({errors: 'Authentication failed auth token not provided', success: false})
        }
    }
}

const AdminAuthenticationMiddleware = () => {
    return async (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            req.token = bearer[1];
            let doctor = await doctor_service.get_doctor_from_token(req.token)
            if (doctor && doctor.user && doctor.user.is_email_verified && doctor.user.is_active && !doctor.user.is_blocked){
                req.user = doctor.user
                req.doctor = doctor
                next();
            }else{
                res.status(403).json({errors: 'You are not authorised to view this page', success: false})
            }
        }else{
            res.status(403).json({errors: 'Authentication failed auth token not provided', success: false})
        }
    }
}


const user_auth_middleware = UserAuthenticationMiddleware()
const doc_auth_middleware = DoctorAuthenticationMiddleware()

module.exports = {
    user_auth_middleware,
    doc_auth_middleware
}
