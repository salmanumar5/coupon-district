const mongoose = require('mongoose');

const ClaimLogSchema = new mongoose.Schema({
    ipAddress: { type: String, required: true },
    browserSession: { type: String, required: true },
    couponCode: { type: String, required: true },
    claimedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClaimLog', ClaimLogSchema);
