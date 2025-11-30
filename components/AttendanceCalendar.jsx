import React from "react";

const AttendanceCalendar = ({ records = [] }) => {
  return (
    <div className="calendar-box">
      <h3>Attendance History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="3">No records found</td>
            </tr>
          ) : (
            records.map((a) => (
              <tr key={a._id}>
                <td>{new Date(a.date).toLocaleDateString()}</td>
                <td>{a.checkIn || "-"}</td>
                <td>{a.checkOut || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceCalendar;
