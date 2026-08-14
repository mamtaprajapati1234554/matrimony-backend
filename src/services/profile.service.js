const Profile = require('../models/Profile');
const ApiError = require('../utils/ApiError');

// GET - apni profile dekhna
async function getMyProfile(userId) {
  const profile = await Profile.findOne({ user: userId });
  if (!profile) {
    throw new ApiError(404, 'Profile abhi tak bani nahi hai.', 'PROFILE_NOT_FOUND');
  }
  return profile;
}

// CREATE ya UPDATE - dono ek hi function se
async function upsertMyProfile(userId, payload) {
  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    { $set: payload, user: userId },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
  return profile;
}

module.exports = { getMyProfile, upsertMyProfile };