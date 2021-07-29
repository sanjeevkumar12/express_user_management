const db = require('../db')
const {ValidationError, NotFound} = require('../errors/throwable')
const auth_service = require('../auth/service')

const create_doc = async (req) => {
    let doc_exists = await db.Doctor.findOne({license: req.validate_data.license})
    let errors = []
    if (doc_exists) {
        errors.push({'licence' : 'This licence cannot be used please try with other licence.'})
    }
    let user_exists = await auth_service.get_user_by_email(req.validate_data.email)
    if (user_exists) {
        errors.push({'email' : 'This email is not available'})
    }
    if (errors.length > 0){
        throw new ValidationError(errors)
    }
    let user = await auth_service.create_user(req)
    let data = req.validate_data || req.body
    data.user = user._id;
    let doc = new db.Doctor(data)
    return doc.save()
}

const list = async (req) => {
    return db.Doctor.paginate()
}

module.exports = {
    create_doc,
    list
}



