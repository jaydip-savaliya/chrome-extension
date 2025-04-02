import React, { useState } from "react";

const GetCurrentUrl = () => {
  const [currentUrl, setCurrentUrl] = useState("Click the button to get URL");

  const fetchCurrentUrl = () => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0) {
          setCurrentUrl(tabs[0].url || "No URL available");
        } else {
          setCurrentUrl(window.location.href || "No URL available");
        }
      });
    } else {
      setCurrentUrl(window.location.href || "No URL available");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 20, textAlign: "center", width: 250 }}>
      <h1 style={{ fontSize: 18 }}>Current URL:</h1>
      <p style={{ fontSize: 14, wordWrap: "break-word" }}>{currentUrl}</p>
      <button
        onClick={fetchCurrentUrl}
        style={{ marginTop: 10, padding: 10, fontSize: 14, cursor: "pointer" }}
      >
        Get Current URL
      </button>
    </div>
  );
};

export default GetCurrentUrl;
