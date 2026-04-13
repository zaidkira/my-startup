const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    date: { type: Date, default: Date.now },
    steps: { type: Number, default: 0 },
    stepsGoal: { type: Number, default: 10000 },
    heartRateAvg: { type: Number },
    sleepHours: { type: Number },
    sleepQuality: { type: String, enum: ['Poor', 'Fair', 'Good', 'Excellent'] }
}, {
    timestamps: true
});

module.exports = mongoose.model('Vital', vitalSchema);
