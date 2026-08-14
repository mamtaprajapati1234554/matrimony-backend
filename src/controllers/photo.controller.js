const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const photoService = require('../services/photo.service');

const uploadPhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Koi photo file nahi mili.', 'NO_FILE_UPLOADED');
  }

  // multer-storage-cloudinary file upload hone ke baad, Cloudinary URL yahan deta hai
  const photoUrl = req.file.path;

  const profile = await photoService.addPhoto(req.user._id, photoUrl);
  return sendSuccess(res, 201, 'Photo upload ho gayi.', { profile });
});

const deletePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const profile = await photoService.deletePhoto(req.user._id, id);
  return sendSuccess(res, 200, 'Photo delete ho gayi.', { profile });
});

module.exports = { uploadPhoto, deletePhoto };