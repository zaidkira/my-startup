const mongoose = require('mongoose');

const prescriptionItemSchema = new mongoose.Schema({
    medicineName: { type: String, required: true },
    dosage: { type: String, required: true },
    instructions: { type: String }
});

const prescriptionSchema = new mongoose.Schema({
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    doctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [prescriptionItemSchema],
    status: { 
        type: String, 
        enum: ['pending', 'dispensed'], 
        default: 'pending' 
    },
    notes: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
