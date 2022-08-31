import { React, useState, useEffect } from "react";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  let headers = {
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "sec-ch-ua":
      '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  };
  let params = {
      query: "Full Time Job",
      start: 0,
      limit: 25,
      zipcode: 58004,
      source: "upward",
      ip: "103.185.160.253",
      sid: "6c6d92ba166e4d8ab2f5e5f690f8c4b3",
    }
    
  
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://staging.api.cnxdserv.com/a/api/v2/jobResults?"
      );
      setJobs(res.data);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  // Get current posts
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJob = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return;
};

export default Jobs;
