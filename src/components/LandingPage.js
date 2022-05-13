import React from "react";
//Styling
import "./LandingPage.css";
import logo from "../images/Logo IMG.png";

function LandingPage() {
  return (
    <div>
      <div className="landing-page-redirect">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
          <h1>Bible Speak</h1>
          <h2>Let God's Word Answer Your Questions</h2>
          <div className="button-container">
            <button>Login</button>
            <button>Sign Up</button>
          </div>
        </div>
      </div>
      <div className="description-container">
        <h4>
          Bible Speak is developed to help anyone with questions they may have
          about being a christain, the bible or life in general. It is difficult
          to trust someone’s answer even if they are qouting scripture. It can
          be taken out of context and interpreted wrong to fit their question.
          To solve that, why not just let the bible speak for itself? Here the
          only answer you get IS qouted scripture. However read around that
          scripture to get the full context.{" "}
        </h4>
      </div>
    </div>
  );
}

export default LandingPage;
