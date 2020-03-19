import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loader">
      <img src="loader.gif" alt="loading" className="loader-img" />
    </div>
  );
}
