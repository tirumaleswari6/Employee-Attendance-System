import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Login</h1>

      <form>
        <input type="email" placeholder="Email" required /><br /><br />
        <input type="password" placeholder="Password" required /><br /><br />
        <button type="submit">Login</button>
      </form>
      <br></br>
      <p>
      Manager? <Link to="/manager-login">Login Here</Link>
      </p>
      <br></br>
      <br />
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
