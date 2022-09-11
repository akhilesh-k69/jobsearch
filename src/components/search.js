import { React, useState } from "react";
import JobCard from "./jobcard";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField, CircularProgress, Pagination } from "@mui/material";
import "../styles/search.css";
import useFetch from "./useFetch";
export default function Search() {
  const [job, setJob] = useState("Full Time Jobs");
  const [pincode, setPincode] = useState("58104");
  const [jobHighlight, setJobHighlight] = useState("Full Time Job");
  const [pincodeHighlight, setPincodeHighlight] = useState("58104");
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const PER_PAGE = 10;
  const url = "https://staging.api.cnxdserv.com/a/api/v2/jobResults?";
  const { isLoading, serverError, apiData } = useFetch(
    "GET",
    url,
    start,
    job,
    pincode,
    {}
  );

  const click = () => {
    if (job == "" || pincode == "") {
      alert("Please enter job and pincode");
      return "";
    }
    setPincodeHighlight(pincode);
    setJobHighlight(job);
    setStart(-1);
  };

  if (!isLoading && apiData) {
    const count = Math.ceil(apiData.data.totalCount / PER_PAGE);
    const handleChange = (e, p) => {
      setPage(p);
      setStart((p - 1) * 10);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    return (
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            className="inputButton"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          />
          <input
            type="text"
            className="inputButton"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            style={{ width: "50%", margin: "5px" }}
          />
          <button
            type="submit"
            className="search-button"
            onClick={click}
            style={{ backgroundColor: "#5cb910", color: "white" }}
          >
            <SearchIcon />
          </button>
        </div>
        <p className="message">
          Search Results For <span>{jobHighlight}</span> Near{" "}
          <span>{pincodeHighlight}</span>
        </p>
        {apiData.data.jobs.map((job, index) => {
          return (
            <div>
              <JobCard jobDetails={job} key={index} />
            </div>
          );
        })}
        <div className="pagination">
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </div>
      </div>
    );
  } else
    return (
      <div>
        <div className="search-bar">
          <input
            type="text"
            className="inputButton"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          />
          <input
            type="text"
            className="inputButton"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            style={{ width: "50%", margin: "5px" }}
          />
          <button
            type="submit"
            className="search-button"
            onClick={click}
            style={{ backgroundColor: "#5cb910", color: "white" }}
          >
            <SearchIcon />
          </button>
        </div>
        <p className="message">
          Search Results For <span>{jobHighlight}</span> Near{" "}
          <span>{pincodeHighlight}</span>
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      </div>
    );
}
