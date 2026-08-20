const Preference = require('../models/Preference');
const ApiError = require('../utils/ApiError');

// GET - apni preferences dekhna
async function getMyPreferences(userId) {
  const preference = await Preference.findOne({ user: userId });
  if (!preference) {
    throw new ApiError(404, 'Preferences abhi tak set nahi ki hain.', 'PREFERENCE_NOT_FOUND');
  }
  return preference;
}

// CREATE ya UPDATE - dono ek hi function se
async function upsertMyPreferences(userId, payload) {
  const preference = await Preference.findOneAndUpdate(
    { user: userId },
    { $set: payload, user: userId },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
  return preference;
}

module.exports = { getMyPreferences, upsertMyPreferences };