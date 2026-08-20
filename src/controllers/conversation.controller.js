const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/ApiResponse');
const conversationService = require('../services/conversation.service');
const messageService = require('../services/message.service');

const startConversation = asyncHandler(async (req, res) => {
  const conversation = await conversationService.startOrGetConversation(
    req.user._id,
    req.params.userId
  );
  return sendSuccess(res, 200, 'Conversation mil gayi.', { conversation });
});

const listConversations = asyncHandler(async (req, res) => {
  const conversations = await conversationService.listMyConversations(req.user._id);
  return sendSuccess(res, 200, 'Conversations mil gayi.', { conversations });
});

const getMessages = asyncHandler(async (req, res) => {
  const { page, limit } = req.validatedQuery;
  const result = await messageService.getConversationMessages(
    req.params.id,
    req.user._id,
    { page, limit }
  );
  return sendSuccess(res, 200, 'Chat history mil gayi.', result);
});

module.exports = { startConversation, listConversations, getMessages };