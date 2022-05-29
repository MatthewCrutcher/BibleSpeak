import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Components
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import Answer from "./components/Answer";
import Profile from "./components/Profile";
//Styling
import "./App.css";

export const LoggedInContext = createContext(null);

function App() {
  const [loggedIn, setLoggedIn] = useState(0);

  return (
    <Router>
      <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/feed" element={<Feed />} />
          <Route exact path="/answer" element={<Answer />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </LoggedInContext.Provider>
    </Router>
  );
}

export default App;
