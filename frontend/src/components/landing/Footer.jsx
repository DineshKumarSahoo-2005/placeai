import { GraduationCap } from "lucide-react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand-section">
            <a href="#home" className="footer-brand">
              <div className="footer-brand-icon">
                <GraduationCap size={23} />
              </div>

              <div className="footer-brand-text">
                <span className="footer-brand-name">PlaceAI</span>
                <span className="footer-brand-tagline">
                  Smart Campus Placements
                </span>
              </div>
            </a>

            <p>
              Empowering students, connecting recruiters, and making campus
              placements smarter.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-column">
            <h4>Platform</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#about">About PlaceAI</a>
          </div>

          {/* For users */}
          <div className="footer-links-column">
            <h4>For Users</h4>
            <a href="#home">Students</a>
            <a href="#home">Recruiters</a>
            <a href="#home">Institutions</a>
          </div>

          {/* More */}
          <div className="footer-links-column">
            <h4>Get Started</h4>
            <a href="#home">Login</a>
            <a href="#home">Create Account</a>
            <a href="#home">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PlaceAI. All rights reserved.</p>

          <p className="footer-bottom-note">
            Built to make campus placements smarter.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
