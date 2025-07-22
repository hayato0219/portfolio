/**
 * Header component
 *
 * Top navigation bar for your site. Set to remain visible as the
 * user scrolls so that they can constantly reach any part of your page.
 */
import React, { useState, useEffect } from "react";

const Header = () => {
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        padding: "1rem",
        background: "black",
        width: "100%",
        zIndex: 10,
        color: "white",
      }}
    >     
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <a href="#home" style={{ color: "white" }}>
          Home
        </a>
        <span>|</span>
        <a href="#about" style={{ color: "white" }}>About</a>
        <span>|</span>
        <a href="#portfolio" style={{ color: "white" }}>Portfolio</a>
        <span>|</span>
        <a href="#footer" style={{ color: "white" }}>Contact</a>
      </div>

    </div>
  );
};

export default Header;
