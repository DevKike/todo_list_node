const Joi = require("joi");

const UserSchema = Joi.object({
  name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = UserSchema;
