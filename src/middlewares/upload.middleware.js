const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'matrimony/profile-photos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
  }
});

function fileFilter(req, file, cb) {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new ApiError(400, 'Sirf JPG, PNG, ya WEBP images allowed hain.', 'INVALID_FILE_TYPE'));
  }
  return cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB max
});

module.exports = upload;