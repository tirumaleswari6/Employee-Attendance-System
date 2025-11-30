// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// ----------------------
// MongoDB Connection
// ----------------------
mongoose
  .connect("mongodb://localhost:27017/attendance", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ----------------------
// User Model
// ----------------------
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["employee", "manager"] },
});

const User = mongoose.model("User", UserSchema);

// ----------------------
// Attendance Model
// ----------------------
const AttendanceSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  checkIn: Date,
  checkOut: Date,
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

// ----------------------
// Register Route
// ----------------------
app.post("/api/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.json({ msg: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hash, role });
  await user.save();

  res.json({ msg: "User registered successfully" });
});

// ----------------------
// Login Route
// ----------------------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, "secret123");

  res.json({ msg: "Login success", token, role: user.role });
});

// ----------------------
// Employee Check-in
// ----------------------
app.post("/api/checkin", async (req, res) => {
  const { userId } = req.body;

  const attendance = new Attendance({
    userId,
    checkIn: new Date(),
  });

  await attendance.save();
  res.json({ msg: "Checked in successfully" });
});

// ----------------------
// Employee Check-out
// ----------------------
app.post("/api/checkout", async (req, res) => {
  const { userId } = req.body;

  const record = await Attendance.findOne({ userId, checkOut: null });

  if (!record) return res.json({ msg: "No active check-in found" });

  record.checkOut = new Date();
  await record.save();

  res.json({ msg: "Checked out successfully" });
});

// ----------------------
// Manager – Get Team Attendance
// ----------------------
app.get("/api/all-attendance", async (req, res) => {
  const data = await Attendance.find().populate("userId", "name email");
  res.json(data);
});

// ----------------------
app.listen(5000, () => console.log("Server running on port 5000"));
