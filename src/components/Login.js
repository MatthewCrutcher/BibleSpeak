import React from "react";
//Styling
import "./Login.css";
import logo from "../images/Logo IMG.png";

function Login() {
  return (
    <div>
      <div className="login-page">
        <div className="logo-container-login">
          <img src={logo} alt="Logo" />
          <h2>Bible Speak</h2>
        </div>
        <div className="input-container-login">
          <label>Email:</label>
          <input />
          <label>Password:</label>
          <input />
          <button>Login</button>
          <p>
            Don't Have An Account? <a href="#">Sign Up Here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
