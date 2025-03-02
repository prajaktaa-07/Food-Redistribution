const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/food_donations', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define Mongoose Schema
const FoodSchema = new mongoose.Schema({
    foodName: String,
    quantity: String,
    location: String,
    donor: String,
    timestamp: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', FoodSchema);

// ✅ Fixing the route: GET all donations
app.get('/donations', async (req, res) => {
    try {
        const donations = await Donation.find();
        res.json(donations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Fixing the route: POST a new donation
app.post('/donations', async (req, res) => {
    const { foodName, quantity, location, donor } = req.body;
    const newDonation = new Donation({ foodName, quantity, location, donor });

    try {
        const savedDonation = await newDonation.save();
        res.status(201).json(savedDonation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
