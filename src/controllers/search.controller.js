const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/ApiResponse');
const searchService = require('../services/search.service');

const search = asyncHandler(async (req, res) => {
  const currentUserId = req.user ? req.user._id : null;
  const currentUserGender = req.user ? req.user.gender : null;
  const filters = req.validatedQuery || req.query;
  const result = await searchService.searchProfiles(filters, currentUserId, currentUserGender);
  return sendSuccess(res, 200, 'Search results mil gaye.', result);
});

module.exports = { search };