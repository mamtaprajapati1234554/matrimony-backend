

const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true
    },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, trim: true, maxlength: 2000 },
    readAt: { type: Date, default: null }
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;