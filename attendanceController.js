const Attendance = require("../models/Attendance");

exports.checkIn = async (req, res) => {
  const { time } = req.body;

  const today = new Date().toDateString();

  const exists = await Attendance.findOne({
    user: req.user.id,
    date: today
  });

  if (exists) return res.status(400).json({ message: "Already checked in" });

  const attendance = await Attendance.create({
    user: req.user.id,
    date: today,
    checkIn: time
  });

  res.json(attendance);
};


exports.checkOut = async (req, res) => {
  const { time } = req.body;

  const today = new Date().toDateString();

  const entry = await Attendance.findOne({
    user: req.user.id,
    date: today
  });

  if (!entry) return res.status(400).json({ message: "Check-in not found" });

  entry.checkOut = time;
  await entry.save();

  res.json(entry);
};


exports.history = async (req, res) => {
  const records = await Attendance.find({ user: req.user.id }).sort({ date: -1 });
  res.json(records);
};


exports.allAttendance = async (req, res) => {
  const records = await Attendance.find().populate("user", "name email");
  res.json(records);
};
