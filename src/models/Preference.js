const mongoose = require('mongoose');

const { Schema } = mongoose;

const preferenceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    ageRange: {
      min: { type: Number, min: 18, max: 100 },
      max: { type: Number, min: 18, max: 100 }
    },
    heightRange: {
      min: { type: Number, min: 100, max: 250 },
      max: { type: Number, min: 100, max: 250 }
    },
    incomeRange: {
      min: { type: Number, min: 0 },
      max: { type: Number, min: 0 }
    },

    religion: [{ type: String }],
    caste: [{ type: String }],
    education: [{ type: String }],
    location: [{ type: String }],

    maritalStatus: [
      { type: String, enum: ['never_married', 'divorced', 'widowed', 'awaiting_divorce'] }
    ]
  },
  { timestamps: true }
);

const Preference = mongoose.model('Preference', preferenceSchema);
module.exports = Preference;