import React, { useState, useEffect } from "react";
//Styling
import "./Profile.css";
import Navbar from "./Navbar";
import Line from "../images/Line.png";
import Remove from "../images/remove.png";
import "./Feed.css";
//Server
import post from "../server/server";
import answer from "../server/server";

function Profile() {
  const [selection, setSelection] = useState(false);
  const [postInDB, setPostInDB] = useState([]);
  const [answerInDB, setAnswerInDB] = useState([]);
  const [loggedIn, setLoggedIn] = useState(1);

  useEffect(() => {
    const postApiCall = async () => {
      try {
        const res = await post.get("/post");
        setPostInDB(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const answerApiCall = async () => {
      try {
        const res = await answer.get("/answer");
        setAnswerInDB(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    postApiCall();
    answerApiCall();
  }, []);

  // const mapAnswers = answerInDB.map((val) => {
  //   if
  // })

  const mapPost = postInDB.map((val) => {
    if (val.userId === loggedIn) {
      const mappingAnswers = answerInDB.map((value) => {
        if (val.id === value.postId) {
          const mappingScripture = value.scripture.map((scrip) => {
            return <div>{scrip}</div>;
          });
          return (
            <div className="mapped-answers-container">{mappingScripture}</div>
          );
        }
      });
      return (
        <div className="mapping-outer-container">
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
                className="remove-post"

                // onClick={() => handleDelete(val.id, "post")}
              />
            </div>
            <button
              className="answer-button"
              // onClick={() => navigate("/answer")}
            >
              <h4>Answer</h4>
            </button>
          </div>
          <div className="post-container">
            <h3>Answers:</h3>
            <div className="mapped-answers-outer-container">
              {mappingAnswers}
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="button-container">
          <button
            className={
              selection === false
                ? "toggle-button-question"
                : "toggle-button-question-deactive"
            }
            onClick={() => setSelection(false)}
          >
            <h4>Questions</h4>
          </button>
          <button
            className={
              selection === true
                ? "toggle-button-answer"
                : "toggle-button-answer-deactive"
            }
            onClick={() => setSelection(true)}
          >
            <h4>Answers</h4>
          </button>
        </div>
        <h2
          className={
            selection === false
              ? "profile-question-active"
              : "profile-question-none"
          }
        >
          Questions You Have Asked
        </h2>
        <h2
          className={
            selection === true ? "profile-answer-active" : "profile-answer-none"
          }
        >
          Answers You Have Given
        </h2>

        {mapPost}
      </div>
    </div>
  );
}

export default Profile;
