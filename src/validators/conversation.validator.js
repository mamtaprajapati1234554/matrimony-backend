const Joi = require('joi');

const userIdParamSchema = Joi.object({
  userId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({ 'string.pattern.base': 'Invalid user ID format' })
});

const conversationIdParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({ 'string.pattern.base': 'Invalid conversation ID format' })
});

const messagesQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});

module.exports = { userIdParamSchema, conversationIdParamSchema, messagesQuerySchema };