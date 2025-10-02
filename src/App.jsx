/**
 * Application component
 *
 * To contain application wide settings, routes, state, etc.
 */

import React, { useState } from "react";

import Header from "./Components/Header";
import Home from "./Components/Home";

import Footer from "./Components/Footer";
import { translations } from "./translations";

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
  name: "Hayato Seki",
  title: "Graduate Student Portfolio",
  email: "sekihayato0219@icloud.com",
  gitHub: "hayato0219",
  socials: {
    gitHub: "hayato0219",
  },
};

const App = () => {
  const [language, setLanguage] = useState("ja");
  
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = translations[language];

  return (
    <div id="main">
      <Header t={t} language={language} changeLanguage={changeLanguage} />
      <Home siteProps={siteProps} t={t} />
      
      <Footer email={siteProps.email} {...siteProps.socials} name={siteProps.name} t={t} />
    </div>
  );
};

export default App;
