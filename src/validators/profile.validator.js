const Joi = require('joi');

const familyDetailsSchema = Joi.object({
  fatherName: Joi.string().max(100).optional(),
  motherName: Joi.string().max(100).optional(),
  siblings: Joi.number().min(0).max(20).optional(),
  familyType: Joi.string().valid('nuclear', 'joint').optional(),
  familyValues: Joi.string().valid('traditional', 'moderate', 'liberal').optional()
});

const astroDetailsSchema = Joi.object({
  enabled: Joi.boolean().optional(),
  birthTime: Joi.string().optional(),
  birthPlace: Joi.string().max(100).optional()
});

const privacySchema = Joi.object({
  showContactTo: Joi.string().valid('everyone', 'matched_only', 'nobody').optional(),
  showPhotosTo: Joi.string().valid('everyone', 'matched_only', 'nobody').optional()
});

const updateProfileSchema = Joi.object({
  height: Joi.number().min(100).max(250).optional(),
  maritalStatus: Joi.string()
    .valid('never_married', 'divorced', 'widowed', 'awaiting_divorce')
    .optional(),
  motherTongue: Joi.string().max(50).optional(),
  bio: Joi.string().max(1000).optional().allow(''),

  religion: Joi.string().max(50).optional(),
  caste: Joi.string().max(50).optional(),
  subCaste: Joi.string().max(50).optional(),

  education: Joi.string().max(100).optional(),
  occupation: Joi.string().max(100).optional(),
  annualIncome: Joi.number().min(0).optional(),

  city: Joi.string().max(100).optional(),
  state: Joi.string().max(100).optional(),
  country: Joi.string().max(100).optional(),

  familyDetails: familyDetailsSchema.optional(),
  astroDetails: astroDetailsSchema.optional(),
  privacy: privacySchema.optional()
});

module.exports = { updateProfileSchema };