import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          SkillMentor
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="nav-cta">
         Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}