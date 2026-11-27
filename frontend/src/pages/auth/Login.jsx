import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      {/* Left Branding Panel */}
      <section className="login-brand-panel">
        <div className="login-brand-content">
          <a href="/" className="login-logo">
            <div className="login-logo-icon">P</div>
            <span>PlaceAI</span>
          </a>

          <div className="login-brand-message">
            <span className="login-brand-eyebrow">SMART CAMPUS PLACEMENTS</span>

            <h1>
              Your next opportunity
              <br />
              <span>starts here.</span>
            </h1>

            <p>
              Prepare smarter, discover opportunities, and take control of your
              placement journey with PlaceAI.
            </p>
          </div>

          <div className="login-brand-footer">
            <span className="login-brand-dot"></span>
            <span>Empowering the next generation of professionals</span>
          </div>
        </div>
      </section>

      {/* Right Login Panel */}
      <section className="login-form-panel">
        <Link to="/" className="auth-back-home">
          <ArrowLeft size={17} />
          <span>Back to Home</span>
        </Link>
        <div className="login-form-container">
          <div className="login-form-header">
            <span className="login-welcome-label">WELCOME BACK</span>

            <h2>Sign in to PlaceAI</h2>

            <p>Enter your credentials to access your account.</p>
          </div>

          {/* Login Form */}
          <form className="login-form">
            {/* Email */}
            <div className="login-input-group">
              <label htmlFor="email">Email address</label>

              <div className="login-input-wrapper">
                <Mail size={18} className="login-input-icon" />

                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-input-group">
              <label htmlFor="password">Password</label>

              <div className="login-input-wrapper">
                <Lock size={18} className="login-input-icon" />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="login-form-options">
              <label className="login-remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a href="#" className="login-forgot">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button type="submit" className="login-submit-button">
              <span>Sign in</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Signup Link */}
          <div className="login-signup-link">
            <p>
              Don't have an account? <a href="/signup">Create account</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
