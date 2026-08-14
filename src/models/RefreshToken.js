const mongoose = require('mongoose');

const { Schema } = mongoose;

const refreshTokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
    replacedByTokenHash: { type: String, default: null }
  },
  { timestamps: true }
);

// Expired tokens automatically delete ho jayenge (jaise OTP model me tha)
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
module.exports = RefreshToken;