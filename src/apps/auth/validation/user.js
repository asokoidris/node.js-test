const joi = require('joi');

export const createUserSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().required(),
  password: joi.string().required(),
});

export const loginUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
