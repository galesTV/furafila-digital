const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerStudent);
router.post('/login', userController.loginStudent);

module.exports = router;