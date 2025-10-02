import React from "react";
import PropTypes from "prop-types";
import image from "../images/woman-with-tablet.jpg";
import SkillSet from "./SkillSet";
import AboutMe from "./AboutMe";
import Services from "./Services";
import Tools from "./Tools";

const imageAltText = "Azhar Ahmad";

const Home = ({ siteProps, t }) => {
  const { name } = siteProps;

  const containerStyle = {
    padding: "2rem 4rem",
    margin: "0 auto",
    maxWidth: "1200px",
    display: "flex",
    gap: "4rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
  };

  // レスポンシブ対応
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const responsiveContainerStyle = {
    ...containerStyle,
    flexDirection: isMobile ? 'column' : 'row',
    padding: isMobile ? '1.5rem 1rem' : '2rem 4rem',
    gap: isMobile ? '2rem' : '4rem',
  };

  const leftColumnStyle = { 
    flex: "1", 
    display: "flex", 
    flexDirection: "column", 
    gap: "2.5rem",
    minWidth: isMobile ? '100%' : 'auto',
  };
  
  const rightColumnStyle = { 
    flex: "2", 
    display: "flex", 
    flexDirection: "column", 
    gap: "2.5rem",
    minWidth: isMobile ? '100%' : 'auto',
  };

  return (
    <section id="home" style={{ backgroundColor: "#fff", paddingTop: "5rem" }}>
      <div style={responsiveContainerStyle}>
        <div style={leftColumnStyle}>
          <div style={{ textAlign: "center" }}>
            <img src={image} alt={imageAltText} style={{ width: "180px", height: "180px", borderRadius: "50%", objectFit: "cover"}} />
            <h3 style={{ marginTop: "1.5rem", color: "#333", fontSize: "1.4rem", fontWeight: "600", whiteSpace: "pre-line" }}>{t.greeting}</h3>
          </div>
          <SkillSet skills={t.skills} t={t} />
          <Tools tools={t.toolsList} t={t} />
        </div>
        <div style={rightColumnStyle}>
          <AboutMe about={t.aboutDescription} t={t} />
          <Services services={t.experienceList} t={t} />
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  siteProps: PropTypes.object.isRequired,
};

export default Home;
