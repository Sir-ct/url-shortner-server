const Joi = require('joi')

async function validateUrl(req, res, next){
    const schema = Joi.object({
        full_url: Joi.string().uri().required(),
        custom_url: Joi.string()
    })

    let result = schema.validate(req.body)

    if(result.error){
        return res.status(400).json({message: "Validation Error ", data: result.error.details})
    }

    next()
}

async function validateUser(req, res, next){
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    let result = schema.validate(req.body)

    if(result.error){
        return res.status(400).json({message: "Validation Error", data: result.error.details})
    }

    next()
}

module.exports = {validateUrl, validateUser}