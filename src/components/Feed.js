import React, { useState } from "react";
//Styling
import "./Feed.css";
import Line from "../images/Line.png";
import Navbar from "./Navbar";
import Error from "./Error";

function Feed() {
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");

  const handleQuestion = (event) => {
    event.preventDefault();
    if (question === "") {
      setError("Question Cannot Be Empty!");
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="feed-page">
        <form className="question-container" onSubmit={handleQuestion}>
          <h4>What Is Your Question?</h4>
          <textarea
            className="text-area"
            placeholder="Enter Your Question Here."
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
          />
          <Error error={error} />
          <button className="question-button">
            <h4>Post</h4>
          </button>
        </form>

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
