import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/pages/Home/Home";
import State from "./components/pages/State/State";

function App() {
  return (
    <Router>
      <div className="classPage">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/State" element={<State />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
