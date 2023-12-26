const Joi = require("joi");
const customMessages = {
  "string.email": "The email doesn't comply with the expected format!"
};

const userSchema = Joi.object({
  name: Joi.string().min(4).max(255).required(),
  last_name: Joi.string().min(3).max(225).required(),
  email: Joi.string().min(6).max(225).required().email(),
  password: Joi.string().min(6).max(1024).required()
});

module.exports = userSchema;
