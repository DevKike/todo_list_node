const Joi = require("joi");

const title = Joi.string().min(3).max(255);
const description = Joi.string().min(3).max(255);
const finish = Joi.boolean();

const createToDoSchema = Joi.object({
    title: title.required(),
    description: description.required(),
    finish
});

const updateToDoSchema = Joi.object({
    title,
    description,
    finish
});

module.exports = { createToDoSchema, updateToDoSchema };