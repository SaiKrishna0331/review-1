import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const user = loginUser({ email, password });
    if (!user) {
      setErr("Invalid credentials. If you don't have an account, please register.");
      return;
    }
    navigate("/conferences");
  }

  return (
    <section className="panel">
      <h2>User Login</h2>
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
          <Link to="/register" className="btn">Register</Link>
        </div>
      </form>
    </section>
  );
}

export default Login;