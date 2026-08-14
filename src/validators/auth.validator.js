const Joi = require('joi');

const phone = Joi.string()
  .pattern(/^\+?[0-9]{10,15}$/)
  .required()
  .messages({ 'string.pattern.base': 'Phone number 10-15 digit ka hona chahiye' });

const password = Joi.string().min(8).max(128).required().messages({
  'string.min': 'Password kam se kam 8 characters ka hona chahiye'
});

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dob: Joi.date().max('now').required(),
  phone,
  email: Joi.string().email().optional(),
  password,
  profileType: Joi.string().valid('self', 'parent', 'sibling', 'relative', 'friend').required(),
  city: Joi.string().max(100).optional()
});

const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required()
});

const resetPasswordSchema = Joi.object({
  phone,
  newPassword: password
});

module.exports = { registerSchema, loginSchema, resetPasswordSchema };