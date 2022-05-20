import React, { useState, useEffect } from "react";
//Styling
import "./Feed.css";
import Line from "../images/Line.png";
import Navbar from "./Navbar";
import Error from "./Error";
import Remove from "../images/remove.png";
//Server / API
import post from "../server/server";
import answer from "../server/server";

function Feed() {
  const [error, setError] = useState("");
  const [question, setQuestion] = useState({ text: "", userId: 0 });
  const [postInDB, setPostInDB] = useState([]);
  const [answers, setAnswers] = useState([]);
  //Using a dummy logged in ID for now
  const [loggedIn, setLoggedIn] = useState(1);

  useEffect(() => {
    const postApiCall = async () => {
      try {
        const res = await post.get("/post");
        setPostInDB(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const answersApiCall = async () => {
      try {
        const res = await answer.get("/answer");
        setAnswers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    postApiCall();
    answersApiCall();
  }, []);

  const mapPost = postInDB.map((val) => {
    let combineAnswers = [];
    answers.map((value) => {
      if (val.id === value.postId) {
        value.scripture.map((item) => {
          combineAnswers.push(item);
        });
      }
    });

    const displayAnswers = combineAnswers.map((val) => {
      return <div>{val}</div>;
    });

    return (
      <>
        {" "}
        <img className="line-seperator" src={Line} alt="Line Seperator" />
        <div className="post-container">
          <h3>Question:</h3>

          <div className="post-text-container">
            <p>{val.text}</p>
          </div>
          <div className="post-date-remove-container">
            <p className="post-date">25/07/2001</p>
            <img
              src={Remove}
              alt="Remove Post"
              className={
                loggedIn === val.userId ? "remove-post" : "remove-post-none"
              }
              onClick={() => handleDelete(val.id)}
            />
          </div>
          <button className="answer-button">
            <h4>Answer</h4>
          </button>
        </div>
        <div className="post-container">
          <h3>Answers:</h3>
          <div className="post-text-container">
            <p>ANSWERS HERE</p>
            {displayAnswers}
          </div>
        </div>
      </>
    );
  });

  const handleDelete = (id) => {
    post.delete(`/post/${id}`).then((res) => {
      console.log(id);
    });

    return null;
  };

  const handleQuestion = (event) => {
    event.preventDefault();
    if (question === "") {
      setError("Question Cannot Be Empty!");
    } else {
      post.post("/post", question).then((res) => {
        console.log(res);
        window.location.reload();
      });
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
              setQuestion({
                ...question,
                text: event.target.value,
                userId: loggedIn,
              });
            }}
          />
          <Error error={error} />
          <button className="question-button">
            <h4>Post</h4>
          </button>
        </form>
        {mapPost}
      </div>
    </div>
  );
}

export default Feed;
