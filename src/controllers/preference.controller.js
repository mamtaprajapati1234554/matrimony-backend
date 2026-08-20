const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/ApiResponse');
const preferenceService = require('../services/preference.service');

const getMyPreferences = asyncHandler(async (req, res) => {
  const preference = await preferenceService.getMyPreferences(req.user._id);
  return sendSuccess(res, 200, 'Preferences mil gayi.', { preference });
});

const updateMyPreferences = asyncHandler(async (req, res) => {
  const preference = await preferenceService.upsertMyPreferences(req.user._id, req.body);
  return sendSuccess(res, 200, 'Preferences update ho gayi.', { preference });
});

module.exports = { getMyPreferences, updateMyPreferences };