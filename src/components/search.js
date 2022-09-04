import { React, useState, useEffect } from "react";
import JobCard from "./jobcard";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  TextField,
  CircularProgress,
  Pagination,
  Container,
} from "@mui/material";
import "../styles/search.css";
import usePagination from "./pagination";
export default function Search() {
  const [job, setJob] = useState("Full Time Jobs");
  const [pincode, setPincode] = useState("58104");
  const [jobHighlight, setJobHighlight] = useState("Full Time Job");
  const [pincodeHighlight, setPincodeHighlight] = useState("58104");
  const [search, setSearch] = useState("Full Time Jobs");

  const [data, setData] = useState([]);
  const PER_PAGE = 10;
  const [page, setPage] = useState(1);

  let count;
  const param = {
    query: job,
    start: 0,
    limit: 20,
    zipcode: pincode,
    source: "upward",
    ip: "103.185.160.253",
    sid: "6c6d92ba166e4d8ab2f5e5f690f8c4b3",
  };
  let query = Object.keys(param)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(param[k]))
    .join("&");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const stax = await fetch(
      "https://staging.api.cnxdserv.com/a/api/v2/jobResults?" + query,
      {
        method: "GET",
        headers: {
          accept: "*/*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "sec-ch-ua":
            '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
        },
        body: null,
        mode: "cors",
        credentials: "omit",
        referrer: "https://test.myjobscorner.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
      }
    ).then((response) => response.json());
    setData(stax);
  }

  const click = () => {
    if (job == "" || pincode == "") {
      alert("Please enter job and pincode");
      return "";
    }
    setPincodeHighlight(pincode);
    setJobHighlight(job);
    setSearch(job);
    fetchData();
  };

  const _DATA = usePagination(data, PER_PAGE);

  if (Object.keys(data).length != 0) {
    count = Math.ceil(data.data.jobs.length / PER_PAGE);
    console.log("length", count);
    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };

    return (
      <div className="container">
        <div className="search-bar">
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            style={{ width: "100%", margin: "5px" }}
            required
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            style={{ width: "50%", margin: "5px" }}
          />
          <Button
            type="submit"
            className="search-button"
            onClick={click}
            style={{ backgroundColor: "#5cb910", color: "white" }}
          >
            <SearchIcon />
          </Button>
        </div>
        <p className="message">
          Search Results For <span>{jobHighlight}</span> Near{" "}
          <span>{pincodeHighlight}</span>
        </p>
        {_DATA.currentData().map((job, index) => {
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
    );
}
