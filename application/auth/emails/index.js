const {send_email} = require('../../core/helpers/emails');

exports.send_user_verification_email = async (req, user) => {
    const verification_link = await user.verification_link(req)
    await send_email('auth/user.verification.html', user.email, 'Verify your email address to start using', {
        name : `{user.first_name} {user.last_name}`,
        verification_link : verification_link
    })
}