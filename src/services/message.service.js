const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const ApiError = require('../utils/ApiError');

async function getConversationMessages(conversationId, userId, { page = 1, limit = 20 } = {}) {
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    throw new ApiError(404, 'Conversation nahi mili.', 'CONVERSATION_NOT_FOUND');
  }

  const isParticipant = conversation.participants.some(
    (p) => p.toString() === userId.toString()
  );
  if (!isParticipant) {
    throw new ApiError(403, 'Ye conversation aapki nahi hai.', 'FORBIDDEN');
  }

  const skip = (page - 1) * limit;

  const [messages, total] = await Promise.all([
    Message.find({ conversation: conversationId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'name'),
    Message.countDocuments({ conversation: conversationId })
  ]);

  return {
    messages: messages.reverse(),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}

// NAYA FUNCTION - Socket.IO se naya message create karne ke liye
async function createMessage(conversationId, senderId, text) {
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    throw new ApiError(404, 'Conversation nahi mili.', 'CONVERSATION_NOT_FOUND');
  }

  const isParticipant = conversation.participants.some(
    (p) => p.toString() === senderId.toString()
  );
  if (!isParticipant) {
    throw new ApiError(403, 'Ye conversation aapki nahi hai.', 'FORBIDDEN');
  }

  const message = await Message.create({
    conversation: conversationId,
    sender: senderId,
    text
  });

  // DENORMALIZATION UPDATE - Step 53 me banaye gaye fields yahan update honge
  conversation.lastMessageAt = message.createdAt;
  conversation.lastMessageText = text;
  await conversation.save();

  return message.populate('sender', 'name');
}

module.exports = { getConversationMessages, createMessage };