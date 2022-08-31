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
  const [postInDB, setPostInDB] = useState([]);
  const [answerInDB, setAnswerInDB] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(false);
  const [activePost, setActivePost] = useState(false);

  const toggleActiveAnswer = () => setActiveAnswer(!activeAnswer);

  const toggleActivePost = () => setActivePost(!activePost);

  const handleDeleteAnswerPrompt = (deleteID) => {
    setConfirmDelete(deleteID);
    setActiveAnswer(!activeAnswer);
  };

  const handleDeletePostPrompt = (deleteID) => {
    setConfirmDelete(deleteID);
    setActivePost(!activePost);
  };

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

  const { setQuestionID } = useContext(QuestionContext);

  const handlePostDelete = (id) => {
    post.delete(`/post/${id}`).then((res) => {
      answerInDB.map((val) => {
        if (val.postId === id) {
          answer.delete(`/answer/${val.id}`).then((response) => {});
        }
        return null;
      });
      window.location.reload();
    });
  };

  const handleDelete = (id, url) => {
    post.delete(`/${url}/${id}`).then((res) => {
      window.location.reload();
    });

    return null;
  };

  const handleAnswer = (val) => {
    setQuestionID(val);
    navigate("/answer");
  };

  let postExists = false;
  let answerExists = false;
  const mapPost = postInDB
    .slice(0)
    .reverse()
    .map((val) => {
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
                    loggedIn === val.userId
                      ? "remove-answer"
                      : "remove-post-none"
                  }
                  onClick={() => handleDeleteAnswerPrompt(value.id)}
                />
              </div>
            );
          }
          return null;
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
                    handleDeletePostPrompt(val.id);
                  }}
                />
              </div>
              <button className="answer-button" onClick={() => handleAnswer()}>
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
      return null;
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
          <h2 className="questions-asked-header">
            You havent asked any questions!
          </h2>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <div className="profile-container">
          <h2 className="questions-asked-header">Questions You Have Asked</h2>
          <div
            className={
              activeAnswer ? "confirm-delete-container" : "confirm-delete-none"
            }
          >
            <div className="confirm-delete-content">
              <h3>Do you want to delete this answer?</h3>
              <button
                className="confirm-delete-yesButton"
                onClick={() => handleDelete(confirmDelete, "answer")}
              >
                YES
              </button>
              <button
                className="confirm-delete-noButton"
                onClick={() => toggleActiveAnswer()}
              >
                NO
              </button>
            </div>
          </div>
          <div
            className={
              activePost ? "confirm-delete-container" : "confirm-delete-none"
            }
          >
            <div className="confirm-delete-content">
              <h3>Do you want to delete this post?</h3>
              <button
                className="confirm-delete-yesButton"
                onClick={() => handlePostDelete(confirmDelete)}
              >
                YES
              </button>
              <button
                className="confirm-delete-noButton"
                onClick={() => toggleActivePost()}
              >
                NO
              </button>
            </div>
          </div>
          {mapPost}
        </div>
      </div>
    );
  }
}

export default Profile;
