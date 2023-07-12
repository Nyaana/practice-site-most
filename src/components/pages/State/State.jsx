import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

function State() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const [count, setCount] = useState(1);

  const plusCount = () => {
    setCount(count + 1);
  };

  const minusCount = () => {
    setCount(count - 1);
  };

  return (
    <body>
      <header>
        <div>
          <span className="logo">Nyaana</span>
        </div>
        <nav className="navigacion">
          <Link to="/" className="linkHome">
            Home
          </Link>
          <NavLink to="/State" className="linkInState">
            State
          </NavLink>
          <NavLink to="/Users" className="linkUsers">
            Users
          </NavLink>
          <NavLink to="/Posts" className="linkPosts">
            Add posts
          </NavLink>
          <NavLink to="/Basket" className="linkBasket">
            Basket
          </NavLink>
          <NavLink onClick={handleLogout} className="linkLogout">
            Logout
          </NavLink>
          <NavLink to="/Profile">
            <button className="buttonProfile">Profile</button>
          </NavLink>
        </nav>
      </header>

      <div className="classState">
        <div className="classContainerState">
          <div className="classPlusMinus">
            <button onClick={minusCount} className="classMinus">
              -
            </button>
            <p>{count}</p>
            <button onClick={plusCount} className="classPlus">
              +
            </button>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-container">
          <p>Copyriting</p>
        </div>
      </footer>
    </body>
  );
}

export default State;
