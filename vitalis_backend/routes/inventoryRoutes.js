const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, inventoryController.getInventory);
router.post('/', authMiddleware, inventoryController.addStock);
router.put('/:id', authMiddleware, inventoryController.updateStock);

module.exports = router;
