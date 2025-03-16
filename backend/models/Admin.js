const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Will be hashed in the controller
});

module.exports = mongoose.model('Admin', AdminSchema);
