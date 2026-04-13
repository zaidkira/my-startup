const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firebaseUid: { type: String, unique: true, sparse: true }, // Auth managed by Firebase
    role: { 
        type: String, 
        enum: ['patient', 'doctor', 'pharmacist'], 
        required: true 
    },
    // Doctor Specific
    specialty: { type: String },
    // Patient Specific
    medicalHistory: [{ type: String }],
    lastVisit: { type: Date },
    // Pharmacist Specific
    gardeMode: { type: Boolean, default: false } // Night shift emergency status
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
