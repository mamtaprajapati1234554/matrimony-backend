const express = require('express');
const controller = require('../controllers/preference.controller');
const validate = require('../middlewares/validate');
const { protect } = require('../middlewares/auth.middleware');
const { updatePreferenceSchema } = require('../validators/preference.validator');

const router = express.Router();

router.get('/me', protect, controller.getMyPreferences);
router.put('/me', protect, validate(updatePreferenceSchema), controller.updateMyPreferences);

module.exports = router;