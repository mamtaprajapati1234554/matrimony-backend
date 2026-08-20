const express = require('express');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const profileRoutes = require('./profile.routes');
const dashboardRoutes = require('./dashboard.routes');
const searchRoutes = require('./search.routes');
const preferenceRoutes = require('./preference.routes');
const interestRoutes = require('./interest.routes');
const conversationRoutes = require('./conversation.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/search', searchRoutes);
router.use('/preferences', preferenceRoutes);
router.use('/interests', interestRoutes);
router.use('/conversations', conversationRoutes);

module.exports = router;