const express = require('express');
const { viewAvailableSlots, bookAppointment } = require('../controllers/studentCapabilities'); 
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

// View available time slots for a specific professor
router.get('/availability/:professorId', viewAvailableSlots);

// Book an appointment
router.post('/appointment', auth, bookAppointment);

module.exports = router;