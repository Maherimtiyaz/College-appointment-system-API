const Availability = require('../models/Availability');
const Appointment = require('../models/Appointment');

// Get all available time slots for a specific date
exports.viewAvailableSlots = async (req, res) => {
    const { professorId } = req.params;
    const availability = await Availability.findOne({ professor: professorId });
    if (!availability) {
        return res.status(404).json({ error: 'Availability not found' });
    }
    res.json(availability);
};

// Book an appoinment
exports.bookAppointment = async (req, res) => {
    const { studentId, professor, timeslot } = req.body;
    await Appointment.create({
        studentId,
        professorId,
        timeSlot,
    });
    res.json({ message: "Appointment booked successfully" });
};