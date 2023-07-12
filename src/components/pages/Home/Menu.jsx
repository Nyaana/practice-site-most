import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProducts } from "../../store/productsSlice";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../store/authSlice";

function Menu() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <body>
      <div className="classMenu">
        <NavLink to="/" className="linkInHome">
          Home
        </NavLink>
        <p></p>
        {isAuthenticated ? (
          <>
            <NavLink to="/State" className="linkState">
              State
            </NavLink>
            <p></p>
            <NavLink to="/Users" className="linkUsers">
              Users
            </NavLink>
            <p></p>
            <NavLink to="/Posts" className="linkPosts">
              Add posts
            </NavLink>
            <p></p>
            <NavLink to="/Basket" className="linkBasket">
              Basket
            </NavLink>
            <p></p>
            <NavLink onClick={handleLogout} className="linkLogout">
              Logout
            </NavLink>
            <p></p>
            <NavLink to="/Profile">
              <button className="buttonProfile">Profile</button>
            </NavLink>
            <p></p>
          </>
        ) : (
          <NavLink to="/Login" className="linkSignIn">
            Sign In
          </NavLink>
        )}
      </div>
    </body>
  );
}

export default Menu;
