import { ArrowRight, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import "./hero.css";

const Hero = () => {
  return (
    <section className="landing-hero" id="home">
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={15} />
          <span>AI-powered campus placement platform</span>
        </div>

        <h1>
          Your Career.
          <br />
          <span>Your Future.</span>
          <br />
          Our Intelligence.
        </h1>

        <p className="hero-description">
          Empower students, connect recruiters, and simplify campus placements
          with an intelligent platform built for the future of hiring.
        </p>

        <div className="hero-actions">
          <button className="hero-primary-btn">
            Get Started
            <ArrowRight size={18} />
          </button>

          <button className="hero-secondary-btn">Explore Platform</button>
        </div>

        <div className="hero-trust-points">
          <div>
            <CheckCircle2 size={17} />
            <span>Smart job matching</span>
          </div>

          <div>
            <CheckCircle2 size={17} />
            <span>AI resume analysis</span>
          </div>

          <div>
            <CheckCircle2 size={17} />
            <span>Placement tracking</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-dashboard-card">
          <div className="hero-dashboard-top">
            <div>
              <span className="hero-dashboard-label">Placement Overview</span>
              <h3>Student Dashboard</h3>
            </div>

            <div className="hero-dashboard-icon">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="hero-dashboard-stats">
            <div className="hero-stat-card">
              <span>Profile Score</span>
              <strong>92%</strong>
              <small>Excellent profile</small>
            </div>

            <div className="hero-stat-card">
              <span>Matched Jobs</span>
              <strong>24</strong>
              <small>Based on your skills</small>
            </div>
          </div>

          <div className="hero-match-section">
            <div className="hero-match-header">
              <div>
                <span>AI Match Score</span>
                <strong>Recommended opportunity</strong>
              </div>

              <span className="hero-match-badge">94% Match</span>
            </div>

            <div className="hero-job-card">
              <div className="hero-job-logo">T</div>

              <div className="hero-job-info">
                <strong>Software Engineer</strong>
                <span>Technology · Full-time</span>
              </div>

              <div className="hero-job-arrow">
                <ArrowRight size={18} />
              </div>
            </div>

            <div className="hero-skills">
              <span>Java</span>
              <span>React</span>
              <span>SQL</span>
              <span>Problem Solving</span>
            </div>
          </div>

          <div className="hero-dashboard-footer">
            <div className="hero-footer-indicator"></div>
            <span>AI-powered career recommendations</span>
          </div>
        </div>

        <div className="hero-floating-card">
          <div className="hero-floating-icon">
            <Sparkles size={18} />
          </div>

          <div>
            <strong>AI Career Insights</strong>
            <span>Discover your next opportunity</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
