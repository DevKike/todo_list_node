const Joi = require("joi");
const customMessages = {
  "string.email": "The email doesn't comply with the expected format!"
};

const registerSchema = Joi.object({
  name: Joi.string().min(4).max(255).required(),
  last_name: Joi.string().min(3).max(225).required(),
  email: Joi.string().min(6).max(225).required().email().message(customMessages),
  password: Joi.string().min(6).max(1024).required()
});

const loginSchema = Joi.object({
  email: Joi.string().required().email().message(customMessages),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };
