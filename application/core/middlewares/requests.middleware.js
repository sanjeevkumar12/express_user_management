const PostRequestMiddleware = (schema, property) => {
    return async (req, res, next) => {
        try{
            req.validate_data = await schema.validateAsync(req[property], { abortEarly: false, errors: {wrap: { label: '' }} });
            next()
        } catch (error) {
            const errors = {}
            for (const err  of error.details){
                errors[err.path[0]] = err.message
            }
            res.status(422).json({errors, success: false})
        }
    }
}
module.exports = {
    PostRequestMiddleware
}
