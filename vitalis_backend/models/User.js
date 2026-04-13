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
    // Specific profile information
    // Patient Specific
    profilePic: { type: String }, // Base64 string or URL
    medicalHistory: [{ type: String }],
    bloodType: { type: String },
    allergies: [{ type: String }],
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    lastVisit: { type: Date },
    // Pharmacist Specific
    gardeMode: { type: Boolean, default: false } // Night shift emergency status
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
