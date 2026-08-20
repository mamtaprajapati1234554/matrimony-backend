const mongoose = require('mongoose');

const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    lastMessageAt: { type: Date, default: Date.now },
    lastMessageText: { type: String, default: '' }
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;