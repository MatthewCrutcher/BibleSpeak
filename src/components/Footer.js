import React from "react";
//Styling
import "./Footer.css";
import logo from "../images/Logo IMG.png";

function Footer() {
  return (
    <div className="footer">
      <div className="logo-container-footer">
        <img src={logo} alt="Logo" />
        <h1>Bible Speak</h1>
      </div>
      <h4 className="footer-slogan">Made In God's Vision</h4>
      <h4 className="footer-feedback">Feedback is Appreciated!</h4>
    </div>
  );
}

export default Footer;
