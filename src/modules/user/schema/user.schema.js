const Joi = require("joi");
const customMessages = {
  "string.email": "The email doesn't comply with the expected format!"
};

const UserSchema = Joi.object({
  name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().message(customMessages).required(),
  password: Joi.string().required()
});

module.exports = UserSchema;
