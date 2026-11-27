import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.fullName.trim().length < 2) {
      setError("Please enter a valid full name.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.role) {
      setError("Please select an account type.");
      return;
    }

    // UI-only submission for Day 21
    setSuccess(
      "Form validated successfully! Backend signup will be connected on Day 22.",
    );
    console.log("Signup form data:", {
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role,
    });
  };

  return (
    <div className="signup-page">
      {/* Branding Panel */}
      <section className="signup-brand-panel">
        <div className="signup-brand-content">
          <Link to="/" className="signup-logo">
            <div className="signup-logo-icon">P</div>
            <span>PlaceAI</span>
          </Link>

          <div className="signup-brand-message">
            <span className="signup-brand-eyebrow">START YOUR JOURNEY</span>

            <h1>
              Build your future.
              <br />
              <span>One step at a time.</span>
            </h1>

            <p>
              Discover opportunities, prepare for placements, and connect with
              companies through one platform.
            </p>
          </div>

          <div className="signup-brand-footer">
            <span className="signup-brand-dot"></span>
            <span>Your career journey starts with a single step</span>
          </div>
        </div>
      </section>

      {/* Signup Panel */}
      <section className="signup-form-panel">
        <Link to="/" className="auth-back-home">
          <ArrowLeft size={17} />
          <span>Back to Home</span>
        </Link>
        <div className="signup-form-container">
          <div className="signup-form-header">
            <span className="signup-welcome-label">CREATE YOUR ACCOUNT</span>

            <h2>Join PlaceAI</h2>

            <p>Get started with your placement journey.</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="signup-input-group">
              <label htmlFor="fullName">Full name</label>

              <div className="signup-input-wrapper">
                <User size={18} className="signup-input-icon" />

                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="signup-input-group">
              <label htmlFor="signupEmail">Email address</label>

              <div className="signup-input-wrapper">
                <Mail size={18} className="signup-input-icon" />

                <input
                  type="email"
                  id="signupEmail"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="signup-input-group">
              <label htmlFor="signupPassword">Password</label>

              <div className="signup-input-wrapper">
                <Lock size={18} className="signup-input-icon" />

                <input
                  type={showPassword ? "text" : "password"}
                  id="signupPassword"
                  name="password"
                  placeholder="Create a password (8+ characters)"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="signup-input-group">
              <label htmlFor="confirmPassword">Confirm password</label>

              <div className="signup-input-wrapper">
                <Lock size={18} className="signup-input-icon" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="signup-input-group">
              <label>Choose your account type</label>

              <div className="signup-role-options">
                <label
                  className={`signup-role-card ${
                    formData.role === "student" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                  />

                  <GraduationCap size={23} />

                  <span className="signup-role-title">Student</span>
                  <span className="signup-role-description">
                    Explore placements & opportunities
                  </span>
                </label>

                <label
                  className={`signup-role-card ${
                    formData.role === "company" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="company"
                    checked={formData.role === "company"}
                    onChange={handleChange}
                  />

                  <Building2 size={23} />

                  <span className="signup-role-title">Company</span>

                  <span className="signup-role-description">
                    Recruit & discover talent
                  </span>
                </label>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="signup-message signup-error">{error}</div>
            )}

            {/* Success */}
            {success && (
              <div className="signup-message signup-success">{success}</div>
            )}

            {/* Submit */}
            <button type="submit" className="signup-submit-btn">
              Create account
              <span>→</span>
            </button>

            <p className="signup-terms">
              By creating an account, you agree to use PlaceAI responsibly.
            </p>
          </form>

          <div className="signup-login-link">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
