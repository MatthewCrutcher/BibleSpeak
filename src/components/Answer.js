import React, { useState, useEffect } from "react";
//API
import bibleApi from "./api/bibleApi";
//https://api.scripture.api.bible/v1/
import { BIBLE_API_KEY } from "./api/bibleApiKey";
//Styling
import "./Answer.css";
import Navbar from "./Navbar";
//KJV ID de4e12af7f28f599-02

function Answer() {
  const [bibleBooks, setBibleBooks] = useState([]);

  useEffect(() => {
    const bibleBookApiCall = async () => {
      try {
        const res = await bibleApi.get("bibles/de4e12af7f28f599-02/books", {
          headers: {
            "api-key": BIBLE_API_KEY,
          },
        });

        setBibleBooks(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    bibleBookApiCall();
  }, []);

  const renderBooks = bibleBooks.map((val) => {
    return (
      <ul key={val.id} className="unorderd-list">
        <li className="list-item">{val.name}</li>
      </ul>
    );
  });

  return (
    <div className="background">
      <Navbar />
      <div className="answer-container">
        <div className="list-label-container">
          <h4 className="list-label">BOOKS</h4>
          <div className="list-container">{renderBooks}</div>
        </div>
        <div>
          <h4 className="list-label">CHAPTERS</h4>
          <div className="list-container">{renderBooks}</div>
        </div>
        <div>
          <h4 className="list-label">VERSES</h4>
          <div className="list-container">{renderBooks}</div>
        </div>
      </div>
      <div className="selected-verse">
        <h4>You selected ...</h4>
        <button className="add-verse-button">
          <h4>Add Verse</h4>
        </button>
        <h4>Your verses</h4>
        <button className="submit-button">
          <h4>Submit</h4>
        </button>
      </div>
    </div>
  );
}

export default Answer;
