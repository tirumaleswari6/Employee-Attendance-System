import 'dotenv/config';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Attendance from '../models/Attendance.js';

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/attendance_db');

    await User.deleteMany();
    await Attendance.deleteMany();

    // create users
    const users = [
      { name: 'Alice Employee', email: 'alice@example.com', password: 'password', role: 'employee', employeeId: 'EMP001', department: 'Engineering' },
      { name: 'Bob Employee', email: 'bob@example.com', password: 'password', role: 'employee', employeeId: 'EMP002', department: 'Design' },
      { name: 'Carol Manager', email: 'carol@example.com', password: 'password', role: 'manager', employeeId: 'MGR001', department: 'Engineering' }
    ];

    const createdUsers = [];
    for (const u of users) {
      const user = new User(u);
      await user.save();
      createdUsers.push(user);
    }

    // create 10 days of attendance for employees
    const start = new Date();
    start.setDate(start.getDate() - 9);
    const entries = [];
    for (let i = 0; i < 10; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const date = d.toISOString().slice(0,10);
      createdUsers.filter(u => u.role === 'employee').forEach((user, idx) => {
        const checkIn = new Date(d); checkIn.setHours(9 + idx, 0, 0);
        const checkOut = new Date(d); checkOut.setHours(17, 0, 0);
        entries.push({ userId: user._id, date, checkInTime: checkIn, checkOutTime: checkOut, status: 'present', totalHours: 8 });
      });
    }
    if (entries.length) await Attendance.insertMany(entries);

    console.log('Seed completed');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
