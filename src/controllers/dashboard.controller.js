const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/ApiResponse');
const dashboardService = require('../services/dashboard.service');

const getMyDashboard = asyncHandler(async (req, res) => {
  const dashboard = await dashboardService.getDashboard(req.user);
  return sendSuccess(res, 200, 'Dashboard data mil gaya.', dashboard);
});

module.exports = { getMyDashboard };