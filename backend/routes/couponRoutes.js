const express = require('express');
const { addCoupon, getCoupons, updateCoupon, deleteCoupon, toggleCoupon, getClaimHistory } = require('../controllers/couponController');
const protect = require('../middlewares/authMiddleware');
const { claimCoupon } = require('../controllers/couponController');

const router = express.Router();

// Admin Routes (Protected)
router.post('/add', protect, addCoupon);
router.get('/all', protect, getCoupons);
router.put('/update/:id', protect, updateCoupon);
router.delete('/delete/:id', protect, deleteCoupon);
router.patch('/toggle/:id', protect, toggleCoupon);
router.get('/history', protect, getClaimHistory);
router.post('/claim', claimCoupon); // Guest users can claim a coupon


module.exports = router;
