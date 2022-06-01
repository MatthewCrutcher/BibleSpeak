import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Styling
import dropDown from "../images/navbar-dropdown.png";
import logo from "../images/Logo IMG.png";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const toggleActive = () => {
    setActive(!active);
  };
  const handleLogout = () => {
    navigate("/login");
    localStorage.setItem("user", null);
  };

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const res = await localStorage.getItem("user");
        setLoggedIn(res);
      } catch (error) {
        console.log(error);
      }
    };
    getLoggedInUser();
  }, []);

  return (
    <nav className="navbar-container">
      <a className="logo-link" href="/">
        <div className="logo-container-navbar">
          <img src={logo} alt="Logo" />
          <h2>Bible Speak</h2>
        </div>
      </a>

      <img
        className={active ? "dropdown-img-active" : "dropdown-img"}
        src={dropDown}
        alt="Drop Down Menu"
        onClick={toggleActive}
      />
      <div className={active ? "navbarLinks active" : "navbarLinks"}>
        <ul>
          <li>
            <a onClick={() => navigate("/feed")}>Feed</a>
          </li>
          <li>
            <a onClick={() => navigate("/profile")}>Profile</a>
          </li>
          <li>
            {loggedIn === "null" ? (
              <a onClick={() => handleLogout()}>Login</a>
            ) : (
              <a onClick={() => handleLogout()}>Logout</a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
