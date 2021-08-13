const db = require('../db')
const {ValidationError, NotFound} = require('../errors/throwable')
const auth_service = require('../auth/service')

const create_doc = async (req) => {
    let doc_exists = await db.Doctor.findOne({license: req.validate_data.license})
    let errors = {}
    if (doc_exists) {
        errors.licence = 'This licence cannot be used please try with other licence.'
    }
    let user_exists = await auth_service.get_user_by_email(req.validate_data.email)
    if (user_exists) {
        errors.email = 'This email is not available'
    }
    if (Object.keys(errors).length > 0){
        throw new ValidationError(errors)
    }
    let user = await auth_service.create_user(req)
    let data = req.validate_data || req.body
    data.user = user._id;
    let doc = new db.Doctor(data)
    return doc.save()
}

const verify_email_address =  async (verify_token) => {
    return auth_service.verify_email_address(verify_token)
}

const list = async (req) => {
    return db.Doctor.paginate()
}

const get_doctor_from_token = async (token) => {
    return db.Doctor.findByToken(token);
}

const add_office_to_doctor = async (req, doctor) => {
    let data = req.validate_data || req.body
    return doctor.add_office(data)
}

module.exports = {
    create_doc,
    list,
    verify_email_address,
    get_doctor_from_token,
    add_office_to_doctor
}



