import { GraduationCap } from "lucide-react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="landing-navbar">
      <a href="/" className="landing-brand">
        <div className="landing-brand-icon">
          <GraduationCap size={24} />
        </div>

        <div className="landing-brand-text">
          <span className="landing-brand-name">PlaceAI</span>
          <span className="landing-brand-tagline">Smart Campus Placements</span>
        </div>
      </a>

      <div className="landing-nav-links">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#how-it-works">How it works</a>
        <a href="#about">About</a>
      </div>

      <div className="landing-nav-actions">
        <button
          className="landing-login-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button>

        <button
          className="landing-get-started-btn"
          onClick={() => (window.location.href = "/signup")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
