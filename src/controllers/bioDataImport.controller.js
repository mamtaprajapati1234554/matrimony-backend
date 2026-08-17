const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { ALLOWED_MIME_TYPES } = require('../middlewares/documentUpload.middleware');
const { parseDocument } = require('../services/documentParser.service');
const { extractProfileFields } = require('../services/bioDataFieldMatcher.service');

const previewBioDataImport = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Koi file nahi mili.', 'NO_FILE_UPLOADED');
  }

  const fileType = ALLOWED_MIME_TYPES[req.file.mimetype];
  const parsedData = await parseDocument(req.file.buffer, fileType);
  const extractedFields = extractProfileFields(parsedData);

  if (Object.keys(extractedFields).length === 0) {
    return sendSuccess(
      res,
      200,
      'File padh li, lekin koi jaani-pehchani field nahi mili. Manually bharna padega.',
      { extractedFields: {} }
    );
  }

  return sendSuccess(
    res,
    200,
    'Ye fields extract hui hain. Check karke PUT /api/profile/me se save karo.',
    { extractedFields }
  );
});

module.exports = { previewBioDataImport };