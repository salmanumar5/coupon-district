const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    isClaimed: { type: Boolean, default: false },
    claimedBy: { type: String, default: null }, // Stores IP or session ID
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }, // Toggle availability
});

module.exports = mongoose.model('Coupon', CouponSchema);
