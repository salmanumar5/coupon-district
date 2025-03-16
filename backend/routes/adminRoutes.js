const express = require('express');
const { registerAdmin, loginAdmin, checkAdmin } = require('../controllers/adminController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerAdmin); // Register Admin
router.post('/login', loginAdmin); // Login Admin
router.post('/check', protect, checkAdmin); // Login Admin


module.exports = router;