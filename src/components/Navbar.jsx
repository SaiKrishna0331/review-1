import { Link, useNavigate } from "react-router-dom";
import { currentSession, logout } from "../utils/auth";

export default function Navbar() {
  const nav = useNavigate();
  const session = currentSession();

  function handleLogout() {
    logout();
    nav("/");
  }

  return (
    <header className="navbar">
      <div className="nav-inner">
        <h1 className="brand">Academic Conference</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/conferences">Conferences</Link>
          {!session && <Link to="/login">Login</Link>}
          {!session && <Link to="/register">Register</Link>}
          {!session && <Link to="/admin-login">Admin Login</Link>}
          {session && (
            <>
              <span style={{ marginLeft: 12, color: "#cbd5e1" }}>{session.name}</span>
              <button onClick={handleLogout} className="btn" style={{ marginLeft: 8 }}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
