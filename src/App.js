import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/pages/Home/Home";
import State from "./components/pages/State/State";
import Basket from "./components/pages/Basket/Basket";
import ProductDetails from "./components/pages/Home/ProductDetails";
import Login from "./components/pages/Home/Login";
import Profile from "./components/pages/Home/Profile";
import Posts from "./components/pages/Home/Posts";

function App() {
  return (
    <Router>
      <div className="classPage">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/State" element={<State />} />
          <Route path="/Basket" element={<Basket />} />
          <Route path="/Products/:productId" element={<ProductDetails />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Posts" element={<Posts />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
