import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionContext } from "./QuestionContext";
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
  const navigate = useNavigate();
  const [selection, setSelection] = useState(false);
  const [postInDB, setPostInDB] = useState([]);
  const [answerInDB, setAnswerInDB] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const postApiCall = async () => {
      try {
        const res = await post.get("/post");
        setPostInDB(res.data);
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
    const getLoggedInUser = async () => {
      try {
        const res = await localStorage.getItem("user");
        setLoggedIn(res);
      } catch (error) {
        console.log(error);
      }
    };

    getLoggedInUser();
    postApiCall();
    answerApiCall();
  }, []);

  const { questionID, setQuestionID } = useContext(QuestionContext);

  const handlePostDelete = (id) => {
    post.delete(`/post/${id}`).then((res) => {
      console.log(res);
      answerInDB.map((val) => {
        if (val.postId === id) {
          answer.delete(`/answer/${val.id}`).then((response) => {
            console.log(response);
          });
        }
      });
    });
  };

  const handleDelete = (id, url) => {
    post.delete(`/${url}/${id}`).then((res) => {
      console.log(res);
    });

    return null;
  };

  const handleAnswer = (val) => {
    setQuestionID(val);
    navigate("/answer");
  };

  let postExists = false;
  let answerExists = false;
  const mapPost = postInDB.map((val) => {
    if (val.userId === loggedIn) {
      postExists = true;
      const mappingAnswers = answerInDB.map((value) => {
        if (val.id === value.postId) {
          answerExists = true;
          const mappingScripture = value.scripture.map((scrip, key) => {
            return <div key={key}>{scrip}</div>;
          });
          return (
            <div className="mapped-answers-container" key={value.id}>
              {mappingScripture}
              <img
                src={Remove}
                alt="Remove Answer"
                className={
                  loggedIn === val.userId ? "remove-answer" : "remove-post-none"
                }
                onClick={() => handleDelete(value.id, "answer")}
              />
            </div>
          );
        }
      });
      return (
        <div className="mapping-outer-container" key={val.id}>
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
                onClick={() => {
                  handlePostDelete(val.id);
                }}
              />
            </div>
            <button
              className="answer-button"
              onClick={() => handleAnswer(val.id)}
            >
              <h4>Answer</h4>
            </button>
          </div>
          <div className="post-container">
            <h3>Answers:</h3>

            <div className="mapped-answers-outer-container">
              {answerExists === true ? (
                <div>{mappingAnswers}</div>
              ) : (
                <h4 className="mapped-answers-container">
                  There are no answers yet!
                </h4>
              )}
            </div>
          </div>
        </div>
      );
    }
  });

  if (loggedIn === "null") {
    return (
      <div>
        <Navbar />
        <div className="profile-container">
          <h4 className="error-label-profile">
            You must be logged in to view your profile
          </h4>
        </div>
      </div>
    );
  } else if (postExists === false) {
    return (
      <div>
        <Navbar />
        <div className="profile-container">
          <h2>You havent asked any questions!</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <div className="profile-container">
          <h2>Questions You Have Asked</h2>
          {mapPost}
        </div>
      </div>
    );
  }
}

export default Profile;
