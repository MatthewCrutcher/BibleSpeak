import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Styling
import "./Login.css";
import logo from "../images/Logo IMG.png";
import Error from "./Error";
//Server
import users from "../server/server";

function Login() {
  const navigate = useNavigate();
  const [existingUsers, setExistingUsers] = useState([]);
  const [emailMatches, setEmailMatches] = useState("");
  const [passwordInDB, setPasswordInDB] = useState("");
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [IDMatches, setIDMatches] = useState(0);

  useEffect(() => {
    const userApiCall = async () => {
      try {
        const res = await users.get("/users");
        const response = res.data;
        setExistingUsers(response);
      } catch (error) {
        console.log(error);
      }
    };
    userApiCall();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let emailMatches1 = "";
    let passwordInDB1 = "";
    let IDMatches1 = "";
    existingUsers.map((val) => {
      if (formValues.email === val.email) {
        emailMatches1 = val.email;
        passwordInDB1 = val.password;
        IDMatches1 = val.id;
      }
      return null;
    });
    if (emailMatches1 === "" || formValues.password !== passwordInDB1) {
      event.preventDefault();
      setError("Email or Password Are Incorrect!");
    } else {
      localStorage.setItem("user", IDMatches1);
      console.log(`The user logged in is${IDMatches1}`);
      navigate("/feed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-page">
        <div className="logo-container-login">
          <img src={logo} alt="Logo" />
          <h2>Bible Speak</h2>
        </div>
        <div className="input-container-login">
          <label type="email" required autoCapitalize="none">
            Email:
          </label>
          <input
            id="email-input"
            type="email"
            required
            value={formValues.email}
            onChange={(event) => {
              setFormValues({ ...formValues, email: event.target.value });
            }}
          />
          <label>Password:</label>
          <input
            type="password"
            required
            onChange={(event) => {
              setFormValues({
                ...formValues,
                password: event.target.value,
              });
            }}
          />
          <button type="submit">
            <h4>Login</h4>
          </button>
          <p>
            Don't Have An Account? <a href="/signup">Sign Up Here</a>
          </p>
          <Error error={error} />
        </div>
      </div>
    </form>
  );
}

export default Login;
