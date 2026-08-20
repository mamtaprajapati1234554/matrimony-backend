const Joi = require("joi");

const searchSchema = Joi.object({
  // Age
  ageMin: Joi.number()
    .integer()
    .min(18)
    .max(100)
    .optional(),

  ageMax: Joi.number()
    .integer()
    .min(18)
    .max(100)
    .optional(),

  // Height
  heightMin: Joi.number()
    .min(100)
    .max(250)
    .optional(),

  heightMax: Joi.number()
    .min(100)
    .max(250)
    .optional(),

  // Religion & Community
  religion: Joi.string()
    .trim()
    .max(50)
    .optional(),

  caste: Joi.string()
    .trim()
    .max(50)
    .optional(),

  motherTongue: Joi.string()
    .trim()
    .max(50)
    .optional(),

  // Education & Career
  education: Joi.string()
    .trim()
    .max(100)
    .optional(),

  occupation: Joi.string()
    .trim()
    .max(100)
    .optional(),

  // Income
  incomeMin: Joi.number()
    .min(0)
    .optional(),

  incomeMax: Joi.number()
    .min(0)
    .optional(),

  // Location
  city: Joi.string()
    .trim()
    .max(100)
    .optional(),

  state: Joi.string()
    .trim()
    .max(100)
    .optional(),

  country: Joi.string()
    .trim()
    .max(100)
    .optional(),

  // Marital Status
  maritalStatus: Joi.string()
    .valid(
      "never_married",
      "divorced",
      "widowed",
      "awaiting_divorce"
    )
    .optional(),

  // Gender
  gender: Joi.string()
    .valid("male", "female", "other")
    .optional(),

  // Pagination
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .default(10)
});

module.exports = {
  searchSchema
};