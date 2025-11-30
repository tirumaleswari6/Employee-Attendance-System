import React, { useState } from "react";

function ManagerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Manager Login:", { email, password });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manager Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Manager Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Manager Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default ManagerLoginPage;
