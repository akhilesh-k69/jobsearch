import React from "react";
import landingLogo from "../assets/landing-logo.webp";
import "../styles/header.css";

export default function Header() {
  return (
    <div className="logo">
      <img alt="landing-logo" className="logo-img" src={landingLogo}></img>
    </div>
  );
}
