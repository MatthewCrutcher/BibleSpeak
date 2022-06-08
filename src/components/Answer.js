import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { QuestionContext } from "./QuestionContext";
import { useNavigate } from "react-router-dom";

//API
import bibleApi from "./api/bibleApi";
import answer from "../server/server";
//https://api.scripture.api.bible/v1/
import { BIBLE_API_KEY } from "./api/bibleApiKey";
//Styling
import "./Answer.css";
import Navbar from "./Navbar";
import axios from "axios";
import Error from "../components/Error";
import Line from "../images/Line.png";
import Remove from "../images/remove.png";
import ClipLoader from "react-spinners/ClipLoader";
//KJV ID de4e12af7f28f599-02

function Answer() {
  const loading_spinner_css = `css
  display: block;
  margin: 20% auto auto 42%;
`;

  const loading_spinner_css_selectedVerse = `css
display: block`;
  const [bibleBooks, setBibleBooks] = useState([]); //Get ALL books
  const [chosenBook, setChosenBook] = useState(""); //Users chosen book
  const [chapters, setChapters] = useState([]); //Get ALL chapters from ^^
  const [chosenChapter, setChosenChapter] = useState(""); //Users chosen chapter
  const [verses, setVerses] = useState([]); //Get ALL Verses from ^^
  const [chosenVerse, setChosenVerse] = useState(""); //Users chosen verses
  const [finalVerse, setFinalVerse] = useState(""); //Final verse ready to display
  // Array of chosen verses that are ready to be posted as an answer
  const [chosenAnswers, setChosenAnswers] = useState({
    scripture: [],
    userId: "", // For logged in user
    postId: "",
    id: uuidv4(), // Will be a UUID
  });
  //Errors
  const [error, setError] = useState("");
  const [IDMatches, setIDMatches] = useState(1);
  const [loggedIn, setLoggedIn] = useState(null);
  //Loading
  const [chaptersLoading, setChaptersLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(true);
  const [versesLoading, setVersesLoading] = useState(true);
  const [stateUserId, setStateUserId] = useState("");
  const { questionID, setQuestionID } = useContext(QuestionContext);
  const navigate = useNavigate();

  useEffect(() => {
    const bibleBookApiCall = async () => {
      try {
        const res = await bibleApi.get("bibles/de4e12af7f28f599-02/books", {
          headers: {
            "api-key": BIBLE_API_KEY,
          },
        });

        setBibleBooks(res.data.data);
        setBooksLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const bibleChapterApiCall = async () => {
      if (chosenBook === "") {
        //Loading
      } else {
        try {
          const res = await axios.get(
            `/de4e12af7f28f599-02/books/${chosenBook}/chapters`,
            {
              headers: {
                "api-key": BIBLE_API_KEY,
              },
            }
          );
          setChapters(res.data.data);
          setChaptersLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    const bibleVerseApiCall = async () => {
      if (chosenChapter === "") {
      } else {
        try {
          const res = await axios.get(
            `/de4e12af7f28f599-02/chapters/${chosenChapter}/verses`,
            {
              headers: {
                "api-key": BIBLE_API_KEY,
              },
            }
          );
          setVerses(res.data.data);
          setVersesLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    const finalApiCall = async () => {
      if (chosenVerse === "") {
        //LOADING
      } else {
        try {
          const res = await axios.get(
            `/de4e12af7f28f599-02/verses/${chosenVerse}`,
            {
              headers: {
                "api-key": BIBLE_API_KEY,
              },
            }
          );
          const response = res.data.data.content;
          const strippedVerseContent = response.replace(/(<([^>]+)>)/gi, "");
          setFinalVerse(strippedVerseContent);
        } catch (error) {
          console.log(error);
        }
      }
    };
    const getLoggedInUserSetQuestionID = () => {
      try {
        const res = localStorage.getItem("user");
        setChosenAnswers({ ...chosenAnswers, postId: questionID, userId: res });
        setLoggedIn(res);
      } catch (error) {
        console.log(error);
      }
    };

    finalApiCall();
    bibleVerseApiCall();
    bibleChapterApiCall();
    bibleBookApiCall();
    getLoggedInUserSetQuestionID();
  }, [chosenBook, chosenChapter, chosenVerse]);

  const renderBooks = bibleBooks.map((val) => {
    return (
      <ul
        onClick={() => {
          setChosenBook(val.id);
        }}
        key={val.id}
        className="unorderd-list"
      >
        <li className="list-item">
          <p>{val.name}</p>
        </li>
      </ul>
    );
  });

  const renderChapters = chapters.map((val) => {
    return (
      <ul
        onClick={() => {
          setChosenChapter(val.id);
        }}
        key={val.id}
        className="unorderd-list"
      >
        <li className="list-item">
          <p>{val.reference}</p>
        </li>
      </ul>
    );
  });

  const renderVerses = verses.map((val) => {
    return (
      <ul
        onClick={() => {
          setChosenVerse(val.id);
        }}
        key={val.id}
        className="unorderd-list"
      >
        <li className="list-item">
          <p>{val.reference}</p>
        </li>
      </ul>
    );
  });

  function checkDuplicate(array, value) {
    return array.some((arrayValue) => value === arrayValue);
  }

  const renderAnswer = chosenAnswers.scripture.map((val, key) => {
    return (
      <h4 key={key} className="verse-item">
        {val}
        <img
          className="remove-button"
          onClick={() => {
            let copyArray = [...chosenAnswers.scripture];
            copyArray.splice(val, 1);
            setChosenAnswers({ ...chosenAnswers, scripture: copyArray });
          }}
          src={Remove}
          alt="Remove Verse"
        />
      </h4>
    );
  });

  const handleSubmit = () => {
    if (error === "" && chosenAnswers.scripture.length !== 0) {
      answer.post("/answer", chosenAnswers).then(() => {
        navigate("/feed");
      });
    } else if (
      error === "You cannot submit nothing..." &&
      chosenAnswers.scripture.length !== 0
    ) {
      setError("");
    } else {
      setError("You cannot submit nothing...");
    }
  };

  if (loggedIn === "null") {
    return (
      <div className="background">
        <Navbar />

        <h4 className="error-label-answer">
          You must login to answer any questions
        </h4>
      </div>
    );
  } else if (questionID === "") {
    return (
      <div className="background">
        <Navbar />

        <h4 className="error-label-answer">
          You must click on the 'Answer' button on the feed page
        </h4>
      </div>
    );
  } else {
    return (
      <div className="background">
        <Navbar />
        <div className="answer-container">
          <div className="list-label-container">
            <h4 className="list-label">BOOKS</h4>
            <div className="list-container">
              {booksLoading === true ? (
                <ClipLoader css={loading_spinner_css} />
              ) : (
                <>{renderBooks}</>
              )}
            </div>
          </div>
          <div>
            <h4 className="list-label">CHAPTERS</h4>
            <div className="list-container">
              {chaptersLoading === true ? (
                <ClipLoader css={loading_spinner_css} />
              ) : (
                <>{renderChapters}</>
              )}
            </div>
          </div>
          <div>
            <h4 className="list-label">VERSES</h4>
            <div className="list-container">
              {versesLoading === true ? (
                <ClipLoader css={loading_spinner_css} />
              ) : (
                <>{renderVerses}</>
              )}
            </div>
          </div>
        </div>
        <div className="selected-verse">
          <h3>You selected:</h3>
          <h4 className="final-verse">
            {finalVerse === "" && chosenVerse !== "" ? (
              <ClipLoader css={loading_spinner_css_selectedVerse} />
            ) : (
              <>{finalVerse}</>
            )}
          </h4>
          <button
            onClick={() => {
              if (finalVerse !== "") {
                setError("");
                if (
                  checkDuplicate(chosenAnswers.scripture, chosenVerse) === true
                ) {
                  return setError("You Already Added That Verse!");
                } else {
                  let copyArray = [...chosenAnswers.scripture];
                  copyArray.push(chosenVerse);
                  setChosenAnswers({ ...chosenAnswers, scripture: copyArray });
                }
              } else {
                setError("You Must Pick a Book, Verse and Chapter");
              }
            }}
            className="add-verse-button"
          >
            <h4>Add Verse</h4>
          </button>
          <Error error={error} />
          <h4>Your verses</h4>
          <div className="verses-container">{renderAnswer}</div>
          <button className="submit-button" onClick={handleSubmit}>
            <h4>Submit</h4>
          </button>
        </div>
      </div>
    );
  }
}

export default Answer;
