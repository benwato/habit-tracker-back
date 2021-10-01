//validation
const Joi = require('@hapi/joi');



//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    //validate data before creating user
    //pull out only the error key from the returned object

    return schema.validate(data)
    //if there is an error, simply return with 400 before posting
    
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    //validate data before creating user
    //pull out only the error key from the returned object

    return schema.validate(data)
    //if there is an error, simply return with 400 before posting
    if(error) return res.status(400).send(error.details[0].message);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
