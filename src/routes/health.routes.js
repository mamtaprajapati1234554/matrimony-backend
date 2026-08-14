const express = require('express');
const mongoose = require('mongoose');
const { sendSuccess } = require('../utils/ApiResponse');

const router = express.Router();

router.get('/', (req, res) => {
  const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];

  return sendSuccess(res, 200, 'Service is healthy', {
    status: 'ok',
    database: dbStates[mongoose.connection.readyState] || 'unknown'
  });
});

module.exports = router;