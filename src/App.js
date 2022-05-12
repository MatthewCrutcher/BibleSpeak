import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Components
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Footer from "./components/Footer";

//Styling
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
