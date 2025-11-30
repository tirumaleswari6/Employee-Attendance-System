import React from "react";

function RegisterPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Register</h1>

      <form>
        <input type="text" placeholder="Full Name" required /><br /><br />
        <input type="email" placeholder="Email" required /><br /><br />
        <input type="password" placeholder="Password" required /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
