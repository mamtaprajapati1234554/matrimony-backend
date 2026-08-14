const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const tokenService = require('./token.service');

// REGISTER
async function registerUser(payload) {
  const { name, gender, dob, phone, email, password, profileType, city } = payload;

  const existing = await User.findOne({ $or: [{ phone }, ...(email ? [{ email }] : [])] });
  if (existing) {
    throw new ApiError(409, 'Is phone ya email se account pehle se hai.', 'USER_ALREADY_EXISTS');
  }

  const user = await User.create({
    name,
    gender,
    dob,
    phone,
    email,
    passwordHash: password, // User model ka pre-save hook isko hash kar dega
    profileType,
    city,
    status: 'incomplete'
  });

  const tokens = await tokenService.issueTokenPair(user);

  return { user: user.toSafeObject ? user.toSafeObject() : user, tokens };
}

// LOGIN
async function login(identifier, password) {
  const isEmail = identifier.includes('@');
  const query = isEmail ? { email: identifier.toLowerCase() } : { phone: identifier };

  const user = await User.findOne(query).select('+passwordHash');
  if (!user) {
    throw new ApiError(401, 'Galat phone/email ya password.', 'INVALID_CREDENTIALS');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Galat phone/email ya password.', 'INVALID_CREDENTIALS');
  }

  const tokens = await tokenService.issueTokenPair(user);

  return { user, tokens };
}
// FORGOT PASSWORD (simple version - OTP baad me add karenge)
// FORGOT PASSWORD (simple version - OTP baad me add karenge)
async function resetPassword(phone, newPassword) {
  const user = await User.findOne({ phone });
  if (!user) {
    throw new ApiError(404, 'Is phone number se koi account nahi mila.', 'USER_NOT_FOUND');
  }

  user.passwordHash = newPassword; // pre-save hook isko hash kar dega
  await user.save();

  return true;
}

module.exports = { registerUser, login, resetPassword };