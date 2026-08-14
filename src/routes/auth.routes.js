const express = require('express');
const controller = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema, resetPasswordSchema } = require('../validators/auth.validator');

const router = express.Router();

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.post('/reset-password', validate(resetPasswordSchema), controller.resetPassword);

module.exports = router;