import { useDispatch } from "react-redux";
import { checkIn, checkOut } from "../../features/attendanceSlice";

export default function MarkAttendance() {
  const dispatch = useDispatch();

  const now = new Date().toLocaleTimeString();

  return (
    <div>
      <h2>Mark Attendance</h2>

      <button onClick={() => dispatch(checkIn(now))}>Check In</button>
      <br /><br />
      <button onClick={() => dispatch(checkOut(now))}>Check Out</button>
    </div>
  );
}
