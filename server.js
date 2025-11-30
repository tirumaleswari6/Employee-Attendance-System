// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

// Routes
const authRoutes = require("./routes/auth");
const attendanceRoutes = require("./routes/attendance"); // note spelling in your folder

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/attendance_system";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/attendance", attendanceRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Employee Attendance System API is running");
});

// Start server
const PORT = process.env.PORT || 5000;

// Check if port is already in use
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
