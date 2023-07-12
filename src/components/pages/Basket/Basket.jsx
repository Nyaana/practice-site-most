import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromBasket, clearBasket } from "../../store/basketSlice";

export default function Basket() {
  const basketItems = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  const handleRemoveFromBasket = (itemId) => {
    dispatch(removeFromBasket(itemId));
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
  };

  const calculateTotal = () => {
    let total = 0;
    basketItems.forEach((item) => {
      total += item.price * item.count;
    });
    return total;
  };

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    dispatch(logout());
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
          <Link to="/State" className="linkState">
            State
          </Link>
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

      <div className="classBasket">
        <p className="TitleBasket">Your basket</p>
        {basketItems.length === 0 ? (
          <p className="clearBasket">Your basket is empty.</p>
        ) : (
          <div className="classContainerBasket">
            <button className="classClearBasket" onClick={handleClearBasket}>
              Clear basket
            </button>
            <div>
              {basketItems.map((item) => (
                <div className="classProductsBasket" key={item.id}>
                  <img
                    className="classImgProductsBasket"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <div className="classInfoProductsBasket">
                    <p className="classTitleProductsBasket">{item.title}</p>
                    <p className="classPriceProductsBasket">{item.price} $</p>
                    <button
                      className="classDeletBasket"
                      onClick={() => handleRemoveFromBasket(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="classSumPriceBasket">
              Total sum: {calculateTotal()}$
            </p>
          </div>
        )}
      </div>

      <footer>
        <div className="footer-container">
          <p>Copyriting</p>
        </div>
      </footer>
    </body>
  );
}
