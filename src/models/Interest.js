const mongoose = require('mongoose');

const { Schema } = mongoose;

const interestSchema = new Schema(
  {
    fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    toUser: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

interestSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });

const Interest = mongoose.model('Interest', interestSchema);
module.exports = Interest;