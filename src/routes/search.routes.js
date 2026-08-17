const express = require('express');
const controller = require('../controllers/search.controller');
const validate = require('../middlewares/validate');
const { optionalAuth } = require('../middlewares/auth.middleware');
const { searchSchema } = require('../validators/search.validator');

const router = express.Router();

router.get('/', optionalAuth, validate(searchSchema, 'query'), controller.search);

module.exports = router;