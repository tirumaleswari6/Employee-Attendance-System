import express from 'express';
import { protect, managerOnly } from '../middleware/authMiddleware.js';
import Attendance from '../models/Attendance.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/employee', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const date = new Date().toISOString().slice(0,10);
    const today = await Attendance.findOne({ userId, date });
    const month = new Date().toISOString().slice(0,7);
    const list = await Attendance.find({ userId, date: { $regex: `^${month}` } });
    const summary = { present:0, absent:0, late:0, totalHours:0 };
    list.forEach(a => { summary[a.status] = (summary[a.status]||0)+1; summary.totalHours += a.totalHours||0; });
    const recent = await Attendance.find({ userId }).sort({ date: -1 }).limit(7);
    res.json({ todayStatus: today ? 'Checked In' : 'Not Checked In', summary, totalHours: summary.totalHours, recent });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/manager', protect, managerOnly, async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const date = new Date().toISOString().slice(0,10);
    const todays = await Attendance.find({ date }).populate('userId','name employeeId');
    const present = todays.length;
    const absent = totalEmployees - present;
    const late = todays.filter(x => x.status === 'late').length;
    res.json({ totalEmployees, present, absent, late, todays });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

export default router;
