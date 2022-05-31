// created by Irina Shushkevych
const Joi = require("joi");

const joiAddContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я ]+$/)
    .min(2)
    .max(30)
    .required(),
  email: Joi.string().email().optional(),
  phone_mob1: Joi.string().min(7).max(20).optional(),
  phone_mob2: Joi.string().min(7).max(20).optional(),
  phone_home: Joi.string().min(7).max(20).optional(),
  phone_work: Joi.string().min(7).max(20).optional(),
  favorite: Joi.bool().optional(),
  group: Joi.string().optional(),
});

const joiUpdateContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я ]+$/)
    .min(2)
    .max(30)
    .optional(),
  email: Joi.string().email().optional(),
  phone_mob1: Joi.string().min(7).max(20).optional(),
  phone_mob2: Joi.string().min(7).max(20).optional(),
  phone_home: Joi.string().min(7).max(20).optional(),
  phone_work: Joi.string().min(7).max(20).optional(),
  favorite: Joi.bool().optional(),
  subscription: Joi.string().optional(),
  group: Joi.string().optional(),
});

const joiUpdateContactFavoritsScheme = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  joiAddContactSchema,
  joiUpdateContactSchema,
  joiUpdateContactFavoritsScheme,
};
