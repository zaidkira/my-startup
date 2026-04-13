const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.get('/', userController.getUsers);
// Call this after signing up on Firebase Client SDK
router.post('/sync', authMiddleware, userController.syncUser);
router.put('/:id/garde', authMiddleware, userController.setGardeMode);

module.exports = router;
