const express = require('express');
const controller = require('../controllers/profile.controller');
const photoController = require('../controllers/photo.controller');
const bioDataController = require('../controllers/bioDataImport.controller');
const validate = require('../middlewares/validate');
const { protect } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const { uploadDocument } = require('../middlewares/documentUpload.middleware');
const { updateProfileSchema } = require('../validators/profile.validator');

const router = express.Router();

router.get('/me', protect, controller.getMyProfile);
router.put('/me', protect, validate(updateProfileSchema), controller.updateMyProfile);

router.post('/photos', protect, upload.single('photo'), photoController.uploadPhoto);
router.delete('/photos/:id', protect, photoController.deletePhoto);

router.post(
  '/import-biodata',
  protect,
  uploadDocument.single('document'),
  bioDataController.previewBioDataImport
);

module.exports = router;