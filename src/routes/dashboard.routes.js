const express = require('express');
const controller = require('../controllers/dashboard.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', protect, controller.getMyDashboard);

module.exports = router;