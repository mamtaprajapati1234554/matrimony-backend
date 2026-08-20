const express = require('express');
const controller = require('../controllers/conversation.controller');
const validate = require('../middlewares/validate');
const { protect } = require('../middlewares/auth.middleware');
const {
  userIdParamSchema,
  conversationIdParamSchema,
  messagesQuerySchema
} = require('../validators/conversation.validator');

const router = express.Router();

router.get('/', protect, controller.listConversations);
router.post('/:userId', protect, validate(userIdParamSchema, 'params'), controller.startConversation);
router.get(
  '/:id/messages',
  protect,
  validate(conversationIdParamSchema, 'params'),
  validate(messagesQuerySchema, 'query'),
  controller.getMessages
);

module.exports = router;