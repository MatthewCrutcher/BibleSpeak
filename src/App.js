import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Components
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import Answer from "./components/Answer";
//Styling
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/feed" element={<Feed />} />
        <Route exact path="/answer" element={<Answer />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
