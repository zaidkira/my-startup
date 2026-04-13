const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, prescriptionController.createPrescription);
router.get('/', authMiddleware, prescriptionController.getPrescriptions);
router.put('/:id/status', authMiddleware, prescriptionController.updatePrescriptionStatus);

module.exports = router;
