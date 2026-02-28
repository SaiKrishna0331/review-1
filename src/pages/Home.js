import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-hero">
      <div className="hero-inner">
        <h2>Academic Conference Management System</h2>
        <p className="lead">Create and manage conferences, schedules, and participants with a simple interface.</p>

        <div className="hero-actions">
          <Link to="/conferences"><button className="btn primary">Manage Conferences</button></Link>
          <Link to="/login"><button className="btn">User Login</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;