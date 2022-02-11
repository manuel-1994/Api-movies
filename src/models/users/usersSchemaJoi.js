const Joi = require('joi')

const UsersSchemaJoi = Joi.object({
  firstName: Joi.string().required().max(30),
  lastName: Joi.string().required().max(30),
  email: Joi.string().email().required().max(256),
  password: Joi.string().required().min(8).max(30),
  role: Joi.number().min(0).max(2)
})

module.exports = UsersSchemaJoi