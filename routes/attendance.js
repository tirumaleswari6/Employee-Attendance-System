const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  checkIn,
  checkOut,
  history,
  allAttendance
} = require("../controllers/attendanceController");

// employee
router.post("/check-in", auth, checkIn);
router.post("/check-out", auth, checkOut);
router.get("/history", auth, history);

// manager
router.get("/all", allAttendance);

module.exports = router;
