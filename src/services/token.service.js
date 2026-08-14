const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const ms = require('ms');
const env = require('../config/env');
const RefreshToken = require('../models/RefreshToken');

// ACCESS TOKEN (movie ticket - chhota time, sirf verify hota hai signature se)
function generateAccessToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    env.jwt.accessSecret,
    { expiresIn: env.jwt.accessExpiresIn }
  );
}

function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret);
}

// Refresh token ko database me store karne se pehle hash karte hain
function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

// REFRESH TOKEN (membership card - lamba time, database me track hota hai)
async function issueTokenPair(user) {
  const accessToken = generateAccessToken(user);

  const rawRefreshToken = crypto.randomBytes(48).toString('hex');
  const tokenHash = hashToken(rawRefreshToken);
  const expiresAt = new Date(Date.now() + ms(env.jwt.refreshExpiresIn));

  await RefreshToken.create({
    user: user._id,
    tokenHash,
    expiresAt
  });

  return { accessToken, refreshToken: rawRefreshToken };
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  issueTokenPair,
  hashToken
};