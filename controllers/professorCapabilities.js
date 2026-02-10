const Availability = require('../models/Availability');

// Set or update availability for a professor

exports.setAvailability = async (req, res) => {
    const { professorId, availableeSlots } = req.body;

    if (!professorId || !availableSlots || availableSlots.length === 0) {
        return res.status(400).json({ error: "Professor ID and available slots are required" });
    }

    if (req.user.role !== 'professor' || req.user.userId !== professorId) {
        return res.status(403).json({ message: 'Acccess denied: Invalid professor credentials' });
    }

    try {
        await Availability.findOneAndUpdate(
            { professorId },
            { professorId, availableSlots },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: "Availability set successfully!" });
    }   catch (error) {
        console.error('Error updating availability:', error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get availability for a professor

exports.getAvailability = async (req, res) => {
    const { professorId } = req.params;

    try {
        const availability = await Availability.findOne({ professorId });

        if (!availability) {
            return res.status(404).json({ message: "Availability not found" });
        }
    
        res.status(200).json(availability);
        } catch (error) {
            console.error('Error fetching availability:', error);
            res.status(500).json({ message: "Server error" });
        }
    };