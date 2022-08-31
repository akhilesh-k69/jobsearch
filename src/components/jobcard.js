import { React } from "react";
import "../styles/jobcard.css";
import { Avatar, Container, Grid } from "@mui/material";

export default function JobCard({ jobDetails, key}) {

  return (
    <div className="container">
    <a
      href={jobDetails.url}
      target="__blank"
      className="job-element-card job-wrap-card"
    >
      <Avatar src={jobDetails.logo} style={{ height: "48px", width: "48px" }} sx={{padding: "0", margin: "0"}} />
      <div className="job-list-card">
        <h1>{jobDetails.title}</h1>
        <h2>{jobDetails.location}</h2>
        <a>View Description</a>
        {/* <p className="job-apply-wrapper">View Salary</p> */}
      </div>
    </a>
    </div>

  );
}
