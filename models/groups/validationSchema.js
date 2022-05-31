// created by Irina Shushkevych
const Joi = require("joi");

const joiGroup = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  color: Joi.string().required(),
});

const joiUpdateGroup = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  color: Joi.string().optional(),
});

module.exports = { joiGroup, joiUpdateGroup };
