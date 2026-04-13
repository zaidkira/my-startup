const Inventory = require('../models/Inventory');

// Get stock
exports.getInventory = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new medicine stock
exports.addStock = async (req, res) => {
    try {
        const stock = new Inventory(req.body);
        const savedStock = await stock.save();
        res.status(201).json(savedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update stock status
exports.updateStock = async (req, res) => {
    try {
        const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
