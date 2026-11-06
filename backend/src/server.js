
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const clothingRoutes = require("./routes/clothingRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/clothing", clothingRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("StyleSync Backend is Running!");
});

// Start server after database connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
