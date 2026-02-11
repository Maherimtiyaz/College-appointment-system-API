const express = require('express');
const { setAvailability, getAvailability } = require('../controllers/professorCapabilities');
const { auth } = require('../middleware/authMiddleware');


const router = express.Router();

// Set or update availability for a professor
router.post('/availability', auth, setAvailability);

// Get availability for a professor
router.get('/availability/:professorId', getAvailability);

module.exports = router;