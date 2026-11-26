import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import AboutCTA from "../components/landing/AboutCTA";
import Footer from "../components/landing/Footer";

import "./landing-page.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AboutCTA />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
