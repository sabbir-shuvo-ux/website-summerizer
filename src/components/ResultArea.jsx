import React from "react";
import { loader } from "../assets/index";

const ResultArea = ({ isLoading, text, resultArea }) => {
  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center items-center mt-10">
          <img className="w-20" src={loader} alt="loading article" />
          <p className="orange_gradient">
            Analyzing your site, Please give it 5 seconds
          </p>
        </div>
      )}

      {text.storedSummary && (
        <div className="my-10" id="resultBox" ref={resultArea}>
          <div className="mb-4">
            <h2 className="text-2xl">
              <span className="blue_gradient">Summary</span> for {text.url}
            </h2>
          </div>

          {!isLoading && (
            <div className="summary_box">{text.storedSummary}</div>
          )}
        </div>
      )}
    </>
  );
};

export default ResultArea;
