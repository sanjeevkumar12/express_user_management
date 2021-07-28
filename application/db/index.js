const {User} = require('../auth/models')
const {Doctor, DoctorQualification, DoctorOffice} = require('../doctors/models')

db = {
    User : User,
    Doctor : Doctor,
    DoctorQualification: DoctorQualification,
    DoctorOffice : DoctorOffice
}

module.exports = db
