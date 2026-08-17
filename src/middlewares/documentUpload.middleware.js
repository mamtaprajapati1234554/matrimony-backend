const multer = require('multer');
const ApiError = require('../utils/ApiError');

// Memory storage - file disk/cloud pe save nahi hogi, seedha RAM me milegi
const storage = multer.memoryStorage();

const ALLOWED_MIME_TYPES = {
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-excel': 'xls',
  'text/csv': 'csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/pdf': 'pdf'
};

function fileFilter(req, file, cb) {
  if (!ALLOWED_MIME_TYPES[file.mimetype]) {
    return cb(
      new ApiError(
        400,
        'Sirf Excel, CSV, Word, ya PDF files allowed hain.',
        'INVALID_FILE_TYPE'
      )
    );
  }
  return cb(null, true);
}

const uploadDocument = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB max (documents thodi badi ho sakti hain photos se)
});

module.exports = { uploadDocument, ALLOWED_MIME_TYPES };