const Conversation = require('../models/Conversation');
const Match = require('../models/Match');
const ApiError = require('../utils/ApiError');

// START YA EXISTING CONVERSATION NIKALNA
async function startOrGetConversation(currentUserId, otherUserId) {
  if (currentUserId.toString() === otherUserId.toString()) {
    throw new ApiError(400, 'Khud se chat nahi kar sakte.', 'INVALID_TARGET');
  }

  // Check: dono match hain kya (kisi bhi order me)
  const match = await Match.findOne({
    $or: [
      { userA: currentUserId, userB: otherUserId },
      { userA: otherUserId, userB: currentUserId }
    ]
  });

  if (!match) {
    throw new ApiError(403, 'Chat sirf matched profiles ke saath hi ho sakti hai.', 'NOT_MATCHED');
  }

  // Existing conversation dhoondo (in dono users ke beech)
  let conversation = await Conversation.findOne({
    participants: { $all: [currentUserId, otherUserId], $size: 2 }
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [currentUserId, otherUserId]
    });
  }

  return conversation;
}

// APNI SAARI CONVERSATIONS LIST KARNA
async function listMyConversations(userId) {
  const conversations = await Conversation.find({ participants: userId })
    .populate('participants', 'name gender')
    .sort({ lastMessageAt: -1 });

  return conversations;
}

module.exports = { startOrGetConversation, listMyConversations };