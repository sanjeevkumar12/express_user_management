const path = require('path');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const config = require('../../config');
const transporter = nodemailer.createTransport(config.EMAIL_SETTINGS.smtp);

const get_template = (template_name) => {
    return path.join(config.EMAIL_SETTINGS.template_dir, template_name)
}

const send_email = async (template_name, to_email, subject, email_data = {}, from_email = null) => {
        ejs.renderFile(get_template(template_name), email_data, (err, html) => {
        if (html){
            const mailData = {from: from_email || config.EMAIL_SETTINGS.from,
                to: to_email,
                subject: subject,
                text: '',
                html: html
            };
            transporter.sendMail(mailData, (err, info) => {
                if(err){
                    console.log(err);
                }
                console.log("Info: ", info);
            });
        }
        else{
            console.log(err)
        }
    });

}

module.exports = {
    send_email,
    transporter,
    get_template
}