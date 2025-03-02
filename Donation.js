const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    foodName: { type: String, required: true },
    quantity: { type: String, required: true },
    location: { type: String, required: true },
    donor: { type: String, required: true },
    // timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);
