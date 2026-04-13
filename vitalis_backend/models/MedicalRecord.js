const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    uploadedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' // Could be patient themselves or doctor
    },
    title: { type: String, required: true }, // e.g. "Annual Checkup Report"
    category: { 
        type: String, 
        enum: ['Lab Results', 'X-Rays', 'Prescriptions', 'Other'],
        required: true
    },
    fileType: { type: String, enum: ['PDF', 'JPG', 'PNG', 'DOCX'] },
    fileUrl: { type: String }, // In real app, URL to S3 bucket
    fileSizeStr: { type: String }, // e.g., "2 MB"
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
