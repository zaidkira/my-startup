const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, medicationController.getSchedules);
router.post('/', authMiddleware, medicationController.addSchedule);
router.put('/:id/log', authMiddleware, medicationController.logTaken);

module.exports = router;
