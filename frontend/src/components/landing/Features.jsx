import {
  BrainCircuit,
  FileSearch,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Users,
  ShieldCheck,
} from "lucide-react";

import "./features.css";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Job Matching",
    description:
      "Discover job opportunities matched to your skills, academic profile, and career interests.",
  },
  {
    icon: FileSearch,
    title: "AI Resume Analyzer",
    description:
      "Analyze your resume, identify missing skills, and get actionable suggestions to improve it.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Placement Management",
    description:
      "Explore job drives, track applications, and manage your placement journey in one place.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Career Analytics",
    description:
      "Monitor your preparation, profile progress, application status, and placement performance.",
  },
  {
    icon: Users,
    title: "Recruiter Connect",
    description:
      "Connect students with companies and simplify the campus recruitment process.",
  },
  {
    icon: ShieldCheck,
    title: "Centralized Platform",
    description:
      "Bring students, recruiters, and placement administrators together in one organized system.",
  },
];

const Features = () => {
  return (
    <section className="landing-features" id="features">
      <div className="features-container">
        <div className="features-heading">
          <span className="features-eyebrow">PLATFORM FEATURES</span>

          <h2>
            Everything you need
            <br />
            <span>to get placement-ready</span>
          </h2>

          <p>
            From resume improvement to job discovery, PlaceAI helps students and
            recruiters navigate the campus placement journey more intelligently.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div className="feature-card" key={index}>
                <div className="feature-icon">
                  <Icon size={23} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <div className="feature-card-bottom">
                  <span>Explore feature</span>
                  <span className="feature-arrow">↗</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
