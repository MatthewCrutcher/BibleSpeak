import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../App";
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
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [question, setQuestion] = useState({
    text: "",
    userId: 0,
    id: uuidv4(),
  });
  const [postInDB, setPostInDB] = useState([]);
  const [answers, setAnswers] = useState([]);
  //Using a dummy logged in ID for now
  //const [loggedIn, setLoggedIn] = useState(1);
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);

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
        console.log(loggedIn);
      } catch (error) {
        console.log(error);
      }
    };
    postApiCall();
    answersApiCall();
  }, []);

  const mapPost = postInDB.map((val) => {
    const mappingAnswers = answers.map((value) => {
      if (val.id === value.postId) {
        const mappingScripture = value.scripture.map((scrip) => {
          return <div>{scrip}</div>;
        });
        return (
          <div className="mapped-answers-container">
            {mappingScripture}{" "}
            <img
              src={Remove}
              alt="Remove Answer"
              className={
                loggedIn === value.userId ? "remove-answer" : "remove-post-none"
              }
              onClick={() => handleDelete(value.id, "answer")}
            />
          </div>
        );
      }
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
              onClick={() => handleDelete(val.id, "post")}
            />
          </div>
          <button className="answer-button" onClick={() => navigate("/answer")}>
            <h4>Answer</h4>
          </button>
        </div>
        <div className="post-container">
          <h3>Answers:</h3>
          <div className="mapped-answers-outer-container">{mappingAnswers}</div>
        </div>
      </>
    );
  });

  const handleDelete = (id, url) => {
    post.delete(`/${url}/${id}`).then((res) => {
      console.log(res);
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
      {loggedIn}
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
