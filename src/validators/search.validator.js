const Joi = require('joi');

const searchSchema = Joi.object({
  ageMin: Joi.number().integer().min(18).max(100).optional(),
  ageMax: Joi.number().integer().min(18).max(100).optional(),
  heightMin: Joi.number().min(100).max(250).optional(),
  heightMax: Joi.number().min(100).max(250).optional(),
  religion: Joi.string().max(50).optional(),
  caste: Joi.string().max(50).optional(),
  education: Joi.string().max(100).optional(),
  city: Joi.string().max(100).optional(),
  maritalStatus: Joi.string()
    .valid('never_married', 'divorced', 'widowed', 'awaiting_divorce')
    .optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10)
});

module.exports = { searchSchema };