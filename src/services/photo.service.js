const Profile = require('../models/Profile');
const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');

// PHOTO ADD KARNA
async function addPhoto(userId, photoUrl) {
  const profile = await Profile.findOne({ user: userId });
  if (!profile) {
    throw new ApiError(404, 'Pehle apni profile banao, phir photo upload karo.', 'PROFILE_NOT_FOUND');
  }

  // Agar ye pehli photo hai, use "primary" (main) bana do
  const isFirstPhoto = profile.photos.length === 0;

  profile.photos.push({ url: photoUrl, isPrimary: isFirstPhoto });
  await profile.save();

  return profile;
}

// PHOTO DELETE KARNA
async function deletePhoto(userId, photoId) {
  const profile = await Profile.findOne({ user: userId });
  if (!profile) {
    throw new ApiError(404, 'Profile nahi mili.', 'PROFILE_NOT_FOUND');
  }

  const photo = profile.photos.id(photoId);
  if (!photo) {
    throw new ApiError(404, 'Ye photo nahi mili.', 'PHOTO_NOT_FOUND');
  }

  // Cloudinary se bhi delete karo (taaki storage na bhare)
  const publicId = extractPublicId(photo.url);
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }

  photo.deleteOne();
  await profile.save();

  return profile;
}

// Cloudinary URL se uska "public_id" nikaalna (delete karne ke liye zaroori hai)
function extractPublicId(url) {
  const parts = url.split('/');
  const fileWithExt = parts[parts.length - 1];
  const folderPath = parts.slice(parts.indexOf('matrimony'), -1).join('/');
  const fileName = fileWithExt.split('.')[0];
  return `${folderPath}/${fileName}`;
}

module.exports = { addPhoto, deletePhoto };