const express = require('express');
const { register, login } = require('../controllers/autheController');

const router = express.Router();

// Register route

router.post('/register', register);

// Login route

router.post('/login', login);

module.exports = router;