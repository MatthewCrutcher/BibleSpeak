import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
//Styling
import "./SignUp.css";
import logo from "../images/Logo IMG.png";
import Error from "./Error";
//Server
import users from "../server/server";

function SignUp() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    id: uuidv4(),
  });
  const [existingEmails, setExistingEmails] = useState([]);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const userApiCall = async () => {
      try {
        const res = await users.get("/users");
        const response = res.data;
        setExistingEmails(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    userApiCall();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    existingEmails.map((val) => {
      if (formValues.email === val.email) {
        event.preventDefault();
        console.log("Email already exists");
        throw setError("Email already exists");
      }
      return null;
    });
    if (formValues.password !== confirmPassword) {
      event.preventDefault();
      console.log("Passwords do not");
      throw setError("Passwords do not match");
    } else {
      users.post("/users", formValues).then((res) => {
        localStorage.setItem("user", formValues.id);
        navigate("/feed");
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {existingEmails.length === 0 ? (
        <div className="signup-page">
          <h2 style={{ textAlign: "center" }}>Fetching users...</h2>
        </div>
      ) : (
        <div className="signup-page">
          <div className="logo-container-signup">
            <img src={logo} alt="Logo" />
            <h2>Bible Speak</h2>
          </div>
          <div className="input-container-signup">
            <label className="label-email">Email:</label>
            <input
              id="email-input"
              type="email"
              required
              value={formValues.email}
              onChange={(event) => {
                setFormValues({ ...formValues, email: event.target.value });
              }}
            />
            <div className="create-password-container">
              <div className="label-input-container">
                <label>Create Password:</label>
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
              </div>
              <div className="label-input-container">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  required
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <button>
              <h4>Sign-Up</h4>
            </button>
            <p>
              Already Have An Account? <a href="/login">Login Here</a>
            </p>
            <Error error={error} />
          </div>
        </div>
      )}
    </form>
  );
}

export default SignUp;
