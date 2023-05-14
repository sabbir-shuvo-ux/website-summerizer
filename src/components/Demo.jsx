import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import ResultArea from "./ResultArea";
import UrlHistory from "./UrlHistory";
import SearchBox from "./SearchBox";

const Demo = () => {
  const [result, setResult] = useState({
    url: "",
    storedSummary: "",
  });
  const [allResult, setAllResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(allResult);

  const searchBox = useRef();
  const resultArea = useRef();

  const errorText = (str) => {
    return str.split(":")[1];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // import api key from .env file
    const apiKey = import.meta.env.VITE_RAPID_API_KEY;

    // api credentials
    const url = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${result.url}&length=3`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
    };

    try {
      // fetching data from api
      const response = await fetch(url, options);
      const data = await response.json();

      // checking api give any error
      if (response.status === 503) {
        Swal.fire("Something is wrong", errorText(data.error), "error");
      }

      // check if api is responseding correactly
      if (response.status === 200) {
        const newData = { ...result, storedSummary: data.summary };
        const updateAllData = [newData, ...allResult];

        setResult(newData);

        // store data in localStorage
        localStorage.setItem("searchUrls", JSON.stringify({ updateAllData }));
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
    setIsLoading(false);
  };

  // geting all data from localStorage and update them after add new data
  useEffect(() => {
    const localData = window.localStorage.getItem("searchUrls");
    const parseData = JSON.parse(localData);

    if (parseData) {
      setAllResult(parseData?.updateAllData);
    } else {
      setAllResult([]);
    }
  }, [result.storedSummary]);

  const displayDataInResult = (item) => {
    setResult({
      url: item.url,
      storedSummary: item.storedSummary,
    });
  };

  return (
    <section className="mt-16 w-full md:w-[70%]">
      {/* ============ Search Area ============ */}
      <SearchBox
        handleSubmit={handleSubmit}
        searchBox={searchBox}
        setResult={setResult}
        result={result}
      />
      {/* ===== Search History Block ===== */}
      <UrlHistory
        allResult={allResult}
        displayDataInResult={displayDataInResult}
      />

      {/* ===== api response Block ===== */}
      <ResultArea resultArea={resultArea} isLoading={isLoading} text={result} />
    </section>
  );
};

export default Demo;
