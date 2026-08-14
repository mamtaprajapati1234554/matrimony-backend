const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    // Personal Details
    height: { type: Number }, // cm me
    maritalStatus: {
      type: String,
      enum: ['never_married', 'divorced', 'widowed', 'awaiting_divorce']
    },
    motherTongue: { type: String },
    bio: { type: String, maxlength: 1000 },

    // Religion & Community
    religion: { type: String },
    caste: { type: String },
    subCaste: { type: String },

    // Education & Career
    education: { type: String },
    occupation: { type: String },
    annualIncome: { type: Number },

    // Location
    city: { type: String },
    state: { type: String },
    country: { type: String, default: 'India' },

    // Family Details
    familyDetails: {
      fatherName: { type: String },
      motherName: { type: String },
      siblings: { type: Number, default: 0 },
      familyType: { type: String, enum: ['nuclear', 'joint'] },
      familyValues: { type: String, enum: ['traditional', 'moderate', 'liberal'] }
    },

    // Astro Details (optional)
    astroDetails: {
      enabled: { type: Boolean, default: false },
      birthTime: { type: String },
      birthPlace: { type: String }
    },

    // Photos
    photos: [
      {
        url: { type: String, required: true },
        isPrimary: { type: Boolean, default: false }
      }
    ],

    // Privacy
    privacy: {
      showContactTo: {
        type: String,
        enum: ['everyone', 'matched_only', 'nobody'],
        default: 'matched_only'
      },
      showPhotosTo: {
        type: String,
        enum: ['everyone', 'matched_only', 'nobody'],
        default: 'everyone'
      }
    },

    isComplete: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;