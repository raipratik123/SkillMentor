import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <main className="auth-page">
      <div className="auth-wrapper">

        {/* LEFT PANEL */}
        <div className="auth-brand-panel">
          <div className="auth-brand-badge">Bridge Skill</div>

          <h2>Start Your Journey 🚀</h2>

          <p>
            Join thousands of students using AI to learn smarter, practice better,
            and unlock real mentorship.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="auth-form-card">
          <h1>Sign Up</h1>

          <form className="auth-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create password" />
            </div>

            <button className="primary-btn full-width">
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

      </div>
    </main>
  );
}