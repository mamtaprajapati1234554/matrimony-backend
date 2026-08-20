const express = require('express');
const controller = require('../controllers/interest.controller');
const validate = require('../middlewares/validate');
const { protect } = require('../middlewares/auth.middleware');
const { mongoIdSchema, interestIdSchema } = require('../validators/interest.validator');

const router = express.Router();

router.get('/sent', protect, controller.getSentInterests);
router.get('/received', protect, controller.getReceivedInterests);
router.post('/:userId', protect, validate(mongoIdSchema, 'params'), controller.sendInterest);
router.put('/:id/accept', protect, validate(interestIdSchema, 'params'), controller.acceptInterest);
router.put('/:id/decline', protect, validate(interestIdSchema, 'params'), controller.declineInterest);

module.exports = router;