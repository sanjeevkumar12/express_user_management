const db = require('../db')
const {ValidationError, NotFound} = require('../errors/throwable')
const {send_user_verification_email, send_user_forgot_password_link } = require('../auth/emails')

exports.create_user = async (req) => {
    let data = req.validate_data || req.body
    const user_exists = await db.User.findOne({ email: data.email });
    if (user_exists) {
        throw new ValidationError({'email' : 'This email is not available'})
    }
    const user = new db.User(data);
    await user.save();
    await send_user_verification_email(req, user)
    return user
}

exports.get_user_by_email = async (email) => {
    return db.User.findOne({ email: email });
}


exports.verify_email_address = async (verify_token) => {
    return await db.User.verify_email(verify_token)
}


exports.send_forgot_password_link = async (req) => {
    let data = req.validate_data || req.body
    let user = await db.User.findOne({email: data.email});
    if (user) {
        await send_user_forgot_password_link(req, user)
    }
    return true
}

exports.get_user_from_token = async (token) => {
   return await db.User.findByToken(token);
}

exports.reset_user_password = async (req) => {
    let data = req.validate_data || req.body
    let user = await db.User.findByToken(req.params['token_hash']);
    if (!user) {
        throw new NotFound('This is not valid link')
    }
    if (await user.comparePassword(data.new_password)) {
        throw new ValidationError([{'auth_error': 'This new password is same as your old password.'}])
    }
    else{
        user.password = data.new_password
        user.save()
    }
    return true
}

exports.login_user = async (req) => {
    let data = req.validate_data || req.body
    let user = await db.User.findOne({email: data.email});
    if(user){
        if(!user.is_email_verified){
            await send_user_verification_email(req, user)
            throw new ValidationError({'auth_error' : 'The email associated with this account is not verified. Please verify your email address.'})
        }
        else if(user.is_blocked){
            throw new ValidationError({'auth_error' : 'The given account is blocked please contact administrator for it.'})
        }
        else if (!await user.comparePassword(data.password)){
            throw new ValidationError({'auth_error' : 'Entered Email and Password are not correct.'})
        }else{
            return {
                user,
                token : await user.generateJWT('login-token', req.ip)
            }
        }
    }else{
        throw new ValidationError({'auth_error' : 'Entered Email and Password are not correct.'})
    }
}
