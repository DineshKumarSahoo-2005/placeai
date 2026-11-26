import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  Building2,
} from "lucide-react";

import "./about-cta.css";

const AboutCTA = () => {
  return (
    <>
      {/* About Section */}
      <section className="landing-about" id="about">
        <div className="about-container">
          <div className="about-content">
            <span className="about-eyebrow">ABOUT PLACEAI</span>

            <h2>
              Bridging the gap between
              <span> students and opportunities.</span>
            </h2>

            <p>
              Campus placements can be overwhelming. Students often struggle to
              track opportunities, prepare their resumes, identify skill gaps,
              and stay organized.
            </p>

            <p>
              PlaceAI brings the placement journey into one intelligent platform
              — helping students prepare smarter, helping recruiters discover
              talent, and helping institutions organize campus hiring more
              efficiently.
            </p>

            <div className="about-highlights">
              <div className="about-highlight">
                <GraduationCap size={20} />
                <span>Student-focused</span>
              </div>

              <div className="about-highlight">
                <Building2 size={20} />
                <span>Recruiter-friendly</span>
              </div>

              <div className="about-highlight">
                <Users size={20} />
                <span>Institution-ready</span>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="about-visual-main">
              <div className="about-visual-icon">
                <Sparkles size={32} />
              </div>

              <h3>One platform.</h3>
              <h3 className="about-blue-text">Multiple possibilities.</h3>

              <p>
                Smarter preparation. Better connections. More organized
                placement journeys.
              </p>

              <div className="about-visual-tags">
                <span>Students</span>
                <span>Recruiters</span>
                <span>Institutions</span>
              </div>
            </div>

            <div className="about-decoration about-decoration-one"></div>
            <div className="about-decoration about-decoration-two"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="cta-container">
          <div className="cta-icon">
            <Sparkles size={25} />
          </div>

          <span className="cta-eyebrow">YOUR FUTURE STARTS HERE</span>

          <h2>
            Ready to make your
            <br />
            <span>next move?</span>
          </h2>

          <p>
            Start building your placement journey with smarter tools, better
            preparation, and opportunities that matter.
          </p>

          <button className="cta-primary-btn">
            Get Started
            <ArrowRight size={18} />
          </button>

          <div className="cta-bottom-note">
            Built to empower the next generation of professionals.
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutCTA;
