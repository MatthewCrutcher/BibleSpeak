import React from "react";
//Styling
import "./Feed.css";
import Line from "../images/Line.png";
import Navbar from "./Navbar";

function Feed() {
  return (
    <div>
      <Navbar />
      <div className="feed-page">
        <button className="question-button">
          <h4>Ask a Question</h4>
        </button>
        <img className="line-seperator" src={Line} alt="Line Seperator" />
        <div className="post-container">
          <h3>Question</h3>
          <div className="post-text-container">
            <p>Example Text</p>
          </div>

          <p className="post-date">25/07/2001</p>
          <button className="answer-button">
            <h4>Answer</h4>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feed;
