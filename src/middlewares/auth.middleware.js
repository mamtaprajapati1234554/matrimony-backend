const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { verifyAccessToken } = require('../services/token.service');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new ApiError(401, 'Login zaroori hai. Token nahi mila.', 'UNAUTHORIZED');
  }

  const payload = verifyAccessToken(token);

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new ApiError(401, 'User exist nahi karta.', 'USER_NOT_FOUND');
  }

  req.user = user;
  next();
});

module.exports = { protect };