const valid_password = (password) => {
    return /^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{6,30}$/.test(password)
}


module.exports = {
    valid_password
}