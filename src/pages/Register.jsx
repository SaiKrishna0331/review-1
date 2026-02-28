import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    try {
      registerUser({ name, email, password });
      navigate("/login");
    } catch (e) {
      setErr(e.message || "Unable to register");
    }
  }

  return (
    <section className="panel">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {err && <div style={{ color: "#e53e3e" }}>{err}</div>}
        <div className="form-actions">
          <button className="btn primary" type="submit">Create account</button>
        </div>
      </form>
    </section>
  );
}
