import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { QuestionContext } from "./QuestionContext";

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
    userId: "",
    id: uuidv4(),
    date: "",
  });
  const current = new Date();
  const [postInDB, setPostInDB] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({
    active: false,
    id: "",
    scripture: [],
  });
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  const handleDeletePrompt = (id) => {
    return (
      <div className={active ? "confirm-delete" : "confirm-delete-none"}>
        <div>Do you want to delete this answer?</div>
        <button onClick={() => handleDelete(0, "answer")}>YES</button>
        <button>NO</button>
      </div>
    );
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
    const answersApiCall = async () => {
      try {
        const res = await answer.get("/answer");
        setAnswers(res.data);
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

    postApiCall();
    answersApiCall();
    getLoggedInUser();
  }, []);
  const { setQuestionID } = useContext(QuestionContext);

  const mapPost = postInDB
    .slice(0)
    .reverse()
    .map((val) => {
      let answerExists = false;
      const mappingAnswers = answers.map((value) => {
        if (val.id === value.postId) {
          answerExists = true;
          const mappingScripture = value.scripture.map((scrip, key) => {
            return <div key={key}>{scrip}</div>;
          });
          return (
            <div key={value.id}>
              <div className="mapped-answer-delete-container">
                <div className="mapped-answers-container">
                  {mappingScripture}
                </div>
                <img
                  src={Remove}
                  alt="Remove Answer"
                  className={
                    loggedIn === value.userId
                      ? "remove-answer"
                      : "remove-post-none"
                  }
                  onClick={() => toggleActive()}
                />
              </div>
            </div>
          );
        }
        return null;
      });

      const handleAnswer = () => {
        setQuestionID(val.id);
        navigate("/answer");
      };

      return (
        <div className="mapping-outer-container" key={val.id}>
          {" "}
          <img className="line-seperator" src={Line} alt="Line Seperator" />
          <div className="post-container">
            <h3>Question:</h3>
            <div className="post-text-container">
              <p>{val.text}</p>
            </div>
            <div className="post-date-remove-container">
              <p className="post-date">{val.date}</p>
              <img
                src={Remove}
                alt="Remove Post"
                className={
                  loggedIn === val.userId ? "remove-post" : "remove-post-none"
                }
                onClick={() => handlePostDelete(val.id)}
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
    });

  const handlePostDelete = (id) => {
    post.delete(`/post/${id}`).then((res) => {
      console.log(res);
      answers.map((val) => {
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
      console.log(res);
    });

    window.location.reload();
  };

  const handleQuestion = (event) => {
    event.preventDefault();
    if (question.text === "") {
      setError("Question Cannot Be Empty!");
      event.preventDefault();
    } else if (loggedIn === "null") {
      setError("You must login to post something!");
    } else {
      post.post("/post", question).then((res) => {
        window.location.reload();
      });
    }
  };

  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

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
                date: date,
              });
            }}
          />
          <Error error={error} />
          <button className="question-button" onClick={handleQuestion}>
            <h4>Post</h4>
          </button>
        </form>
        {mapPost}
        {handleDeletePrompt()}
      </div>
    </div>
  );
}

export default Feed;

/*
 <div
                className={active ? "confirm-delete" : "confirm-delete-none"}
              >
                <div>Are you sure you want to delete this?</div>
                <button onClick={() => handleDelete(0, "answer")}>YES</button>
                <button>NO</button>
              </div>
*/
