import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getHistory } from "../../features/attendanceSlice";

export default function History() {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(getHistory());
  }, []);

  return (
    <div>
      <h2>Attendance History</h2>
      {history.map((h) => (
        <div key={h._id}>
          {h.date} — In: {h.checkIn} — Out: {h.checkOut}
        </div>
      ))}
    </div>
  );
}
