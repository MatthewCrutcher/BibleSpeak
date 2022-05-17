import React from "react";
//Styling
import "./Error.css";

function Error(props) {
  return (
    <div className={props.error === "" ? "error-label-none" : "error-label"}>
      <h4>{props.error}</h4>
    </div>
  );
}

export default Error;
