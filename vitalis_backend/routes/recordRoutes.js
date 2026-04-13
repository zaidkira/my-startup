const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, recordController.getRecords);
router.post('/', authMiddleware, recordController.addRecord);

module.exports = router;
