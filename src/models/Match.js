const mongoose = require('mongoose');

const { Schema } = mongoose;

const matchSchema = new Schema(
  {
    userA: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    userB: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    matchedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

matchSchema.index({ userA: 1, userB: 1 }, { unique: true });

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;