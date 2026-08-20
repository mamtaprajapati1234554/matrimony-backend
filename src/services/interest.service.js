const Interest = require('../models/Interest');
const Match = require('../models/Match');
const ApiError = require('../utils/ApiError');

// INTEREST BHEJNA
async function sendInterest(fromUserId, toUserId) {
  if (fromUserId.toString() === toUserId.toString()) {
    throw new ApiError(400, 'Khud ko interest nahi bhej sakte.', 'INVALID_TARGET');
  }

  const existing = await Interest.findOne({ fromUser: fromUserId, toUser: toUserId });
  if (existing) {
    throw new ApiError(409, 'Pehle se hi interest bheji hui hai.', 'INTEREST_ALREADY_SENT');
  }

  const interest = await Interest.create({ fromUser: fromUserId, toUser: toUserId });
  return interest;
}

// SENT INTERESTS DEKHNA
async function getSentInterests(userId) {
  return Interest.find({ fromUser: userId })
    .populate('toUser', 'name gender dob')
    .sort({ createdAt: -1 });
}

// RECEIVED INTERESTS DEKHNA
async function getReceivedInterests(userId) {
  return Interest.find({ toUser: userId })
    .populate('fromUser', 'name gender dob')
    .sort({ createdAt: -1 });
}

// Do user IDs ko HAMESHA consistent order me lana (chhoti ID pehle)
// Isse duplicate matches (A+B aur B+A dono) kabhi nahi banenge
function getOrderedPair(userId1, userId2) {
  const id1 = userId1.toString();
  const id2 = userId2.toString();
  return id1 < id2 ? [id1, id2] : [id2, id1];
}

// INTEREST ACCEPT KARNA (+ MATCH BANANA)
async function acceptInterest(interestId, currentUserId) {
  const interest = await Interest.findById(interestId);

  if (!interest) {
    throw new ApiError(404, 'Interest nahi mili.', 'INTEREST_NOT_FOUND');
  }

  if (interest.toUser.toString() !== currentUserId.toString()) {
    throw new ApiError(403, 'Ye interest tumhe nahi mili thi.', 'FORBIDDEN');
  }

  if (interest.status !== 'pending') {
    throw new ApiError(400, `Ye interest already ${interest.status} hai.`, 'INVALID_STATUS');
  }

  interest.status = 'accepted';
  await interest.save();

  // Match banao (consistent order me, taaki duplicate na bane)
  const [userA, userB] = getOrderedPair(interest.fromUser, interest.toUser);

  const existingMatch = await Match.findOne({ userA, userB });
  if (!existingMatch) {
    await Match.create({ userA, userB });
  }

  return interest;
}

// INTEREST DECLINE KARNA
async function declineInterest(interestId, currentUserId) {
  const interest = await Interest.findById(interestId);

  if (!interest) {
    throw new ApiError(404, 'Interest nahi mili.', 'INTEREST_NOT_FOUND');
  }

  if (interest.toUser.toString() !== currentUserId.toString()) {
    throw new ApiError(403, 'Ye interest tumhe nahi mili thi.', 'FORBIDDEN');
  }

  if (interest.status !== 'pending') {
    throw new ApiError(400, `Ye interest already ${interest.status} hai.`, 'INVALID_STATUS');
  }

  interest.status = 'declined';
  await interest.save();

  return interest;
}

module.exports = {
  sendInterest,
  getSentInterests,
  getReceivedInterests,
  acceptInterest,
  declineInterest
};