import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../utils/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const admin = loginAdmin({ email, password });
    if (!admin) {
      setErr("Invalid admin credentials.");
      return;
    }
    navigate("/conferences");
  }

  return (
    <section className="panel">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {err && <div style={{ color: "#e53e3e" }}>{err}</div>}
        <div className="form-actions">
          <button className="btn primary" type="submit">Login</button>
        </div>
      </form>
      <div style={{ marginTop: 12, color: "var(--muted)" }}>
        Demo admin: admin@conference.local / admin123
      </div>
    </section>
  );
}
