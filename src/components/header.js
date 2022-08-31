import React from "react";
import landingLogo from "../assets/landing-logo.webp";
import "../styles/header.css";
import {Grid } from "@mui/material";


export default function Header() {
  return (
    <div>
      <Grid className="logo">
        <img alt="landing-logo" className="logo-img" src={landingLogo}></img>
      </Grid>
    </div>
  );
}
