import React from "react";
//Styling
import "./SignUp.css";
import logo from "../images/Logo IMG.png";

function SignUp() {
  return (
    <div>
      <div className="signup-page">
        <div className="logo-container-signup">
          <img src={logo} alt="Logo" />
          <h2>Bible Speak</h2>
        </div>
        <div className="input-container-signup">
          <label id="email-label">Email:</label>
          <input id="email-input" />

          <div className="create-password-container">
            <div className="label-input-container">
              <label>Password:</label>
              <input />
            </div>
            <div className="label-input-container">
              <label>Password:</label>
              <input />
            </div>
          </div>

          <button>
            <h4>Sign-Up</h4>
          </button>
          <p>
            Don't Have An Account? <a href="#">Sign Up Here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
