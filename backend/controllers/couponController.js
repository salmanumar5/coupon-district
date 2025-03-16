const Coupon = require('../models/Coupon');
const ClaimLog = require('../models/ClaimLog');
const crypto = require('crypto');


// Add a New Coupon
const addCoupon = async (req, res) => {
    try {
        const { code } = req.body;

        // Check if coupon already exists
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ message: 'Coupon already exists' });
        }

        // Create a new coupon
        const newCoupon = await Coupon.create({ code });

        res.status(201).json({ message: 'Coupon added successfully', coupon: newCoupon });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get All Coupons
const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Update Coupon
const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { code } = req.body;

        const updatedCoupon = await Coupon.findByIdAndUpdate(id, { code }, { new: true });

        if (!updatedCoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json({ message: 'Coupon updated successfully', coupon: updatedCoupon });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete Coupon
const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCoupon = await Coupon.findByIdAndDelete(id);

        if (!deletedCoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Toggle Coupon Availability
const toggleCoupon = async (req, res) => {
    try {
        const { code } = req.params;

        const coupon = await Coupon.findOne(code);
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        coupon.isActive = !coupon.isActive;
        await coupon.save();

        res.status(200).json({ message: `Coupon ${coupon.isActive ? 'enabled' : 'disabled'}` });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const claimCoupon = async (req, res) => {
    try {
        const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const sessionID = req.cookies.sessionID || req.headers['session-id'] || crypto.randomUUID();

        // Set a session cookie if it doesn't exist
        if (!req.cookies.sessionID) {
            res.cookie('sessionID', sessionID, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1-day expiry
        }

        // Check if the user has already claimed a coupon
        const existingClaim = await ClaimLog.findOne({ 
            $or: [{ ipAddress: userIP }, { browserSession: sessionID }]
        });

        if (existingClaim) {
            return res.status(400).json({ message: `You already claimed coupon: ${existingClaim.couponCode}` });
        }

        // Find an available coupon
        const coupon = await Coupon.findOne({ isClaimed: false, isActive: true }).sort({ createdAt: 1 });

        if (!coupon) {
            return res.status(400).json({ message: 'No coupons available' });
        }

        // Mark coupon as claimed
        coupon.isClaimed = true;
        coupon.claimedBy = sessionID;
        await coupon.save();

        // Log the claim
        await ClaimLog.create({
            ipAddress: userIP,
            browserSession: sessionID,
            couponCode: coupon.code
        });

        return res.status(200).json({ message: 'Coupon claimed successfully', coupon: coupon.code });
    } catch (error) {
        console.error('Error claiming coupon:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getClaimHistory = async (req, res) => {
    try {
        const history = await ClaimLog.find().sort({ claimedAt: -1 }); // Get all claims sorted by latest
        return res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching claim history:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};




module.exports = { addCoupon, getCoupons, updateCoupon, deleteCoupon, toggleCoupon, claimCoupon, getClaimHistory };
