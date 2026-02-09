const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    availableSlots: [String],
});

module.exports = mongoose.model('Availability', AvailabilitySchema);