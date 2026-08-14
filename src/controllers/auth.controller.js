const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/ApiResponse');
const authService = require('../services/auth.service');

const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  return sendSuccess(res, 201, 'Registration successful.', result);
});

const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;
  const result = await authService.login(identifier, password);
  return sendSuccess(res, 200, 'Login successful.', result);
});

const resetPassword = asyncHandler(async (req, res) => {
  const { phone, newPassword } = req.body;
  await authService.resetPassword(phone, newPassword);
  return sendSuccess(res, 200, 'Password reset ho gaya. Ab naye password se login karo.', {});
});

module.exports = { register, login, resetPassword };