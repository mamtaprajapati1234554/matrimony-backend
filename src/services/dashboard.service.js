const Profile = require('../models/Profile');

// Profile "kitni percent complete hai" calculate karne ke liye
// ye fields dekhenge - jitni bhari hain, utna % complete
const COMPLETION_FIELDS = [
  'height',
  'maritalStatus',
  'religion',
  'education',
  'occupation',
  'city',
  'bio'
];

function calculateCompletion(profile) {
  if (!profile) return 0;

  const filledCount = COMPLETION_FIELDS.filter((field) => {
    const value = profile[field];
    return value !== undefined && value !== null && value !== '';
  }).length;

  return Math.round((filledCount / COMPLETION_FIELDS.length) * 100);
}

async function getDashboard(user) {
  const profile = await Profile.findOne({ user: user._id });

  return {
    user: {
      id: user._id,
      name: user.name,
      phone: user.phone,
      status: user.status
    },
    profile: profile || null,
    profileCompletion: calculateCompletion(profile),
    // Ye modules abhi bane nahi hain - future me yahan actual counts aayengi
    dailyMatchesCount: 0,
    interestsReceivedCount: 0,
    interestsSentCount: 0
  };
}

module.exports = { getDashboard };