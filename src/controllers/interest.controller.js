const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/ApiResponse');
const interestService = require('../services/interest.service');

const sendInterest = asyncHandler(async (req, res) => {
  const interest = await interestService.sendInterest(req.user._id, req.params.userId);
  return sendSuccess(res, 201, 'Interest bhej di gayi.', { interest });
});

const getSentInterests = asyncHandler(async (req, res) => {
  const interests = await interestService.getSentInterests(req.user._id);
  return sendSuccess(res, 200, 'Sent interests mil gayi.', { interests });
});

const getReceivedInterests = asyncHandler(async (req, res) => {
  const interests = await interestService.getReceivedInterests(req.user._id);
  return sendSuccess(res, 200, 'Received interests mil gayi.', { interests });
});

const acceptInterest = asyncHandler(async (req, res) => {
  const interest = await interestService.acceptInterest(req.params.id, req.user._id);
  return sendSuccess(res, 200, 'Interest accept ho gayi. Match ban gaya!', { interest });
});

const declineInterest = asyncHandler(async (req, res) => {
  const interest = await interestService.declineInterest(req.params.id, req.user._id);
  return sendSuccess(res, 200, 'Interest decline ho gayi.', { interest });
});

module.exports = {
  sendInterest,
  getSentInterests,
  getReceivedInterests,
  acceptInterest,
  declineInterest
};