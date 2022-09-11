import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (method, url, start, job, pincode, body) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (start === -1) start = 0;
    const param = {
      query: job,
      start: start,
      limit: 10,
      zipcode: pincode,
      source: "upward",
      ip: "103.185.160.253",
      sid: "6c6d92ba166e4d8ab2f5e5f690f8c4b3",
    };
    let query = Object.keys(param)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(param[k]))
      .join("&");
    const fetchData = async () => {
      try {
        const resp = await axios({
          method: method,
          url: url + query,
          data: body,
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
        });
        const data = await resp?.data;

        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [start]);

  return { isLoading, apiData, serverError };
};

export default useFetch;
