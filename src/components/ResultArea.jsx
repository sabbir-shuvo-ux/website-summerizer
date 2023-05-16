import React, { useState } from "react";
import { loader, copy, tick } from "../assets/index";

const ResultArea = ({ isLoading, text, resultArea }) => {

  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    setCopied(text.storedSummary);
    navigator.clipboard.writeText(text.storedSummary);
    setTimeout(() => setCopied(''), 5000);
  }

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
            <div className="summary_box relative">
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer"
              onClick={handleCopy}
              title={copied ? "copied" : "copy"}
              >
                <img 
                  src={copied ? tick : copy}
                  alt={copied ? "tick_icon": "copy_icon"} 
                  className="w-5 h-5"/>
              </div>
              <div>{text.storedSummary}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ResultArea;
