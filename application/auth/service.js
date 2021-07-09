const db = require('../db')
create_user = async (req, res) => {
    const user_exists = await db.User.findOne({ email: req.body.email });
    if (user_exists) {
        throw new ValidationError([{'email' : 'This email is not available'}])
    }
    const user = new User(req.validate_data || req.body);
    await user.save();
    await send_verification_mail(user.email, 'DEFAULT_EMAIL_FROM_ADDRESS', 'Please verify your email address start using application.', {})
    return user
}