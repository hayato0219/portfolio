import React from "react";
import PropTypes from "prop-types";
import image from "../images/woman-with-tablet.jpg";
import GetInTouch from "./GetInTouch";
import SkillSet from "./SkillSet";
import AboutMe from "./AboutMe";
import Services from "./Services";
import Tools from "./Tools";

const imageAltText = "Azhar Ahmad";

const Home = ({ siteProps }) => {
  const { name, about, touch, skillSet, services, tools, socials, email, gitHub } = siteProps;

  const containerStyle = {
    padding: "2rem 4rem",
    margin: "0 auto",
    maxWidth: "1200px",
    display: "flex",
    gap: "4rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
  };

  const leftColumnStyle = { flex: "1", display: "flex", flexDirection: "column", gap: "2.5rem" };
  const rightColumnStyle = { flex: "2", display: "flex", flexDirection: "column", gap: "2.5rem" };

  return (
    <section id="home" style={{ backgroundColor: "#fff", paddingTop: "5rem" }}>
      <div style={containerStyle}>
        <div style={leftColumnStyle}>
          <div style={{ textAlign: "center" }}>
            <img src={image} alt={imageAltText} style={{ width: "180px", height: "180px", borderRadius: "50%", objectFit: "cover"}} />
            <h3 style={{ marginTop: "1.5rem", color: "#333", fontSize: "1.4rem", fontWeight: "600" }}>Hi there! I'm {name}</h3>
          </div>
          <GetInTouch email={email} gitHub={gitHub} />
          <SkillSet skills={skillSet} />
        </div>
        <div style={rightColumnStyle}>
          <AboutMe about={about} socials={socials} />
          <Services services={services} />
          <Tools tools={tools} />
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  siteProps: PropTypes.object.isRequired,
};

export default Home;
