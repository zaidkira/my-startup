const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    medicineName: { type: String, required: true }, // e.g., Lipitor 20mg
    instructions: { type: String }, // e.g., Before Breakfast
    timeStr: { type: String, required: true }, // e.g., "08:00 AM"
    isActive: { type: Boolean, default: true },
    takenLogs: [{ type: Date }] // Array of dates when the pill was confirmed taken
}, {
    timestamps: true
});

module.exports = mongoose.model('MedicationSchedule', scheduleSchema);
