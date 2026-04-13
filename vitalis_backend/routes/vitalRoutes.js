const express = require('express');
const router = express.Router({ mergeParams: true });
const vitalController = require('../controllers/vitalController');
const authMiddleware = require('../middlewares/auth');

// Expecting /api/vitals/:patientId
router.get('/:patientId', authMiddleware, vitalController.getVitals);
router.post('/:patientId', authMiddleware, vitalController.addVital);

module.exports = router;
