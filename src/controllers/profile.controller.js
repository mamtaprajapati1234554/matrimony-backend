const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/ApiResponse');
const profileService = require('../services/profile.service');

const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.getMyProfile(req.user._id);
  return sendSuccess(res, 200, 'Profile mil gayi.', { profile });
});

const updateMyProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.upsertMyProfile(req.user._id, req.body);
  return sendSuccess(res, 200, 'Profile update ho gayi.', { profile });
});

module.exports = { getMyProfile, updateMyProfile };