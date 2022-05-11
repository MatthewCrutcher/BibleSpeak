import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Components
import LandingPage from "./components/LandingPage";

//Styling
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
