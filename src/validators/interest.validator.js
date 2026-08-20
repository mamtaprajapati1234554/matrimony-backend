const Joi = require('joi');

const mongoIdSchema = Joi.object({
  userId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({ 'string.pattern.base': 'Invalid user ID format' })
});

const interestIdSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({ 'string.pattern.base': 'Invalid interest ID format' })
});

module.exports = { mongoIdSchema, interestIdSchema };