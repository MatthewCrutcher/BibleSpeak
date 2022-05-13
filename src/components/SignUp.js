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
          <label>Email:</label>
          <input />
          <div className="create-password-container">
            <label>Password:</label>

            <input />
            <label>Password:</label>
            <input />
          </div>

          <button>Sign Up</button>
          <p>
            Don't Have An Account? <a href="#">Sign Up Here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
