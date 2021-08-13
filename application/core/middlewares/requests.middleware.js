const PostRequestMiddleware = (schema, property) => {
    return async (req, res, next) => {
        try{
            req.validate_data = await schema.validateAsync(req[property], { abortEarly: false, errors: {wrap: { label: '' }} });
            next()
        } catch (error) {
            const messages = error.details.map(item => {
                const error_d = {};
                error_d[item.path[0]] = item.message;
                return error_d;
            })
            console.log(messages)
            res.status(422).json({errors: messages ? messages[0] : [], success: false})
        }
    }
}
module.exports = {
    PostRequestMiddleware
}
