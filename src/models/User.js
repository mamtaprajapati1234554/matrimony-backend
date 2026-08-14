const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dob: { type: Date, required: true },

    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true },

    passwordHash: { type: String, required: true, select: false },

    profileType: {
      type: String,
      enum: ['self', 'parent', 'sibling', 'relative', 'friend'],
      required: true
    },
    role: {
      type: String,
      enum: ['member', 'moderator', 'admin', 'super_admin'],
      default: 'member'
    },
    status: {
      type: String,
      enum: ['incomplete', 'pending_approval', 'active', 'suspended', 'deleted'],
      default: 'incomplete'
    },

    isPhoneVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Save hone se pehle password ko automatically hash kar do
// Save hone se pehle password ko automatically hash kar do
userSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) return;
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

// Login ke waqt password check karne ke liye helper method
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

const User = mongoose.model('User', userSchema);
module.exports = User;