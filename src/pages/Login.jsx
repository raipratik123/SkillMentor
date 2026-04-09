import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="auth-page">
      <div className="auth-wrapper">

        {/* LEFT PANEL */}
        <div className="auth-brand-panel">
          <div className="auth-brand-badge">Bridge Skill</div>

          <h2>Welcome Back 👋</h2>

          <p>
            Continue your AI-powered learning journey. Track your progress,
            improve weak topics, and unlock mentorship features.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="auth-form-card">
          <h1>Login</h1>

          <form className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" />
            </div>

            <button className="primary-btn full-width">
              Login
            </button>
          </form>

          <p className="auth-switch">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>

      </div>
    </main>
  );
}