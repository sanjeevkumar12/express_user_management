const db = require('../db')
const {ValidationError} = require('../errors/throwable')
exports.create_user = async (data) => {
    const user_exists = await db.User.findOne({ email: data.email });
    if (user_exists) {
        throw new ValidationError([{'email' : 'This email is not available'}])
    }
    const user = new db.User(data);
    await user.save();
    return user
}

exports.verify_email_address = async (verify_token) => {
    return await db.User.verify_email(verify_token)
}