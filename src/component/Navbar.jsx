import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          ✨ SkillMentor
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/practice">Practice</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="nav-cta">
            🚀 Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}