const Joi = require('joi');

function validateRange(value, helpers) {
  if (value && value.min !== undefined && value.max !== undefined) {
    if (value.min > value.max) {
      return helpers.error('any.invalid', { message: 'min, max se bada nahi ho sakta' });
    }
  }
  return value;
}

const rangeSchema = (min, max) =>
  Joi.object({
    min: Joi.number().min(min).max(max).optional(),
    max: Joi.number().min(min).max(max).optional()
  }).custom(validateRange, 'min-max range check');

const updatePreferenceSchema = Joi.object({
  ageRange: rangeSchema(18, 100).optional(),
  heightRange: rangeSchema(100, 250).optional(),
  incomeRange: rangeSchema(0, 100000000).optional(),

  religion: Joi.array().items(Joi.string().max(50)).optional(),
  caste: Joi.array().items(Joi.string().max(50)).optional(),
  education: Joi.array().items(Joi.string().max(100)).optional(),
  location: Joi.array().items(Joi.string().max(100)).optional(),

  maritalStatus: Joi.array()
    .items(Joi.string().valid('never_married', 'divorced', 'widowed', 'awaiting_divorce'))
    .optional()
});

module.exports = { updatePreferenceSchema };