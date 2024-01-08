const Joi = require("joi");

const createToDoSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(255).required(),
    finish: Joi.boolean()
});

module.exports = createToDoSchema;