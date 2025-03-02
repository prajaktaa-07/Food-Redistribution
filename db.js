const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const app = express();

// MongoDB Connection (Keep it open)
mongoose.connect("mongodb://localhost:27017/food_redistribution", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB connection error:", err));

// Define Schema
const FoodSchema = new mongoose.Schema({
    foodName: String,
    quantity: String,
    location: String,
    donor: String,
    timestamp: { type: Date, default: Date.now }
});

const Food = mongoose.model("Food", FoodSchema);

// ✅ Fetch all donations and send as JSON
app.get("/donations", async (req, res) => {
    try {
        const donations = await Food.find();
        res.json(donations);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch donations" });
    }
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
