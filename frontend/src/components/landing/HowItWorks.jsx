import { UserRound, FileText, Search, Rocket } from "lucide-react";

import "./how-it-works.css";

const steps = [
  {
    number: "01",
    icon: UserRound,
    title: "Build Your Profile",
    description:
      "Create your student profile with your academics, skills, projects, certifications, and career interests.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Analyze Your Resume",
    description:
      "Use AI-powered insights to review your resume, identify skill gaps, and improve your career readiness.",
  },
  {
    number: "03",
    icon: Search,
    title: "Discover Opportunities",
    description:
      "Explore relevant job drives and discover opportunities that align with your skills and eligibility.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Track Your Journey",
    description:
      "Apply for opportunities, track application progress, and stay informed throughout your placement journey.",
  },
];

const HowItWorks = () => {
  return (
    <section className="landing-how-it-works" id="how-it-works">
      <div className="how-it-works-container">
        <div className="how-heading">
          <span className="how-eyebrow">YOUR JOURNEY</span>

          <h2>
            From campus to career,
            <br />
            <span>in four simple steps</span>
          </h2>

          <p>
            A smarter and more organized way to prepare for opportunities and
            navigate campus placements.
          </p>
        </div>

        <div className="how-steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div className="how-step-card" key={step.number}>
                <div className="how-step-top">
                  <span className="how-step-number">{step.number}</span>

                  <div className="how-step-icon">
                    <Icon size={24} />
                  </div>
                </div>

                {index !== steps.length - 1 && (
                  <div className="how-step-connector"></div>
                )}

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
