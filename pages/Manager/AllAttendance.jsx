import { useEffect, useState } from "react";
import api from "../../api/apiClient";

export default function AllAttendance() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/attendance/all").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h2>All Employees Attendance</h2>

      {data.map((d) => (
        <div key={d._id}>
          {d.user?.name} — {d.date} — {d.checkIn} — {d.checkOut}
        </div>
      ))}
    </div>
  );
}
