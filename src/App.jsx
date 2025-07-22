/**
 * Application component
 *
 * To contain application wide settings, routes, state, etc.
 */

import React from "react";

import Header from "./Components/Header";
import Home from "./Components/Home";

import Portfolio from "./Components/Portfolio";
import Footer from "./Components/Footer";

import "./styles.css";

/**
 * This object represents your information. The project is set so that you
 * only need to update these here, and values are passed a properties to the
 * components that need that information.
 *
 * Update the values below with your information.
 *
 * If you don't have one of the social sites listed, leave it as an empty string.
 */
const siteProps = {
  name: "Azhar Ahmad", // From screenshot
  title: "Workfolio", // From screenshot
  email: "sekihayato0219@icloud.com", // Keeping your email
  gitHub: "hayato0219", // Keeping your GitHub
  // New properties from screenshot
  about:
    "Working on Improving myself by exploring new Ideas and designing user interfaces for mobile and web. Combining my graphic and visual designing skills to create an overall great experience.",
  touch: {
    email: "Email",
  },
  skillSet: [
    "Web design",
    "User experience",
    "Inclusive design",
    "Focus group testing",
    "Mobile-first development",
    "Wireframing",
  ],
  services: [
    "Website Designing",
    "Social Media Management",
    "Copywriting",
    "Community Management",
    "Graphic Designing",
    "Content Creation",
  ],
  tools: ["React", "Next.js", "Python", "TensorFlow"], // Using existing tools
  socials: {
    // From screenshot
    website: "https://azharahmad.com",
    instagram: "ItzAzharAhmad",
    facebook: "ItzAzharAhmad",
    gitHub: "hayato0219",
  },
};

const App = () => {
  return (
    <div id="main">
      <Header />
      <Home siteProps={siteProps} />
      
      <Portfolio />
      <Footer {...siteProps.socials} name={siteProps.name} />
    </div>
  );
};

export default App;
