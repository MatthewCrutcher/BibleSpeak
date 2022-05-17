import React, { useState, useEffect } from "react";
//Styling
import "./SignUp.css";
import logo from "../images/Logo IMG.png";
import Error from "./Error";
//Server
import users from "../server/server";

function SignUp() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
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
    }
    users.post("/users", formValues).then((res) => {
      console.log(res);
      //Relocate here
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="signup-page">
        <div className="logo-container-signup">
          <img src={logo} alt="Logo" />
          <h2>Bible Speak</h2>
        </div>
        <div className="input-container-signup">
          <label id="email-label">Email:</label>
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
    </form>
  );
}

export default SignUp;
