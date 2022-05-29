import React, { useState } from "react";
//Styling
import "./Profile.css";
import Navbar from "./Navbar";

function Profile() {
  const [selection, setSelection] = useState(false);
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
            Questions
          </button>
          <button
            className={
              selection === true
                ? "toggle-button-answer"
                : "toggle-button-answer-deactive"
            }
            onClick={() => setSelection(true)}
          >
            Answers
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
      </div>
    </div>
  );
}

export default Profile;
