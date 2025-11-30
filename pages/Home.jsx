import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Attendance Management System</h1>

      <div style={{ marginTop: "30px" }}>
        <Link to="/login">
          <button
            style={{
              padding: "12px 25px",
              margin: "10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Employee Login
          </button>
        </Link>

        <Link to="/manager-login">
          <button
            style={{
              padding: "12px 25px",
              margin: "10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Manager Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
