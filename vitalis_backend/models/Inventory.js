const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., Amoxicillin 500mg
    molecule: { type: String }, // e.g., Antibiotic
    category: { type: String }, // e.g., Antibiotics, Pain Relief
    batchId: { type: String, unique: true },
    quantity: { type: Number, required: true, default: 0 },
    inStock: { type: Boolean, default: true },
    expirationDate: { type: Date },
    lastRestockedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' // Pharmacist
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);
