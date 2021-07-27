const auth_service  = require('../../auth/service');
const {PermissionDenied} = require('../../errors/throwable')

const AuthenticationMiddleware = () => {
    return async (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            req.token = bearer[1];
            let user = await auth_service.get_user_from_token(req.token)
            console.log(user)
            if (user && user.is_email_verfied && user.is_active && !user.is_blocked){
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

const user_auth_middleware = AuthenticationMiddleware()

module.exports = {
    user_auth_middleware
}