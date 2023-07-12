import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProducts } from "../../store/productsSlice";
import { Link, NavLink } from "react-router-dom";
import { addToBasket } from "../../store/basketSlice";
import { logout } from "../../store/authSlice";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const handleAddToBasket = (product) => {
    if (!isLoggedIn) {
      toast.error("Sign in to add item to basket");
      return;
    }
    dispatch(addToBasket(product));
  };

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
      <header>
        <div>
          <span className="logo">Nyaana</span>
        </div>
        <div className="burger">
          <NavLink to="/Menu">
            <button className="buttonMenu">Menu</button>
          </NavLink>
        </div>
        <nav className="navigacion">
          <Link to="/" className="linkInHome">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <NavLink to="/State" className="linkState">
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
            </>
          ) : (
            <NavLink to="/Login" className="linkSignIn">
              Sign In
            </NavLink>
          )}
        </nav>
      </header>

      <div className="classHome">
        <div className="classContainerProducts">
          {products.map((item) => {
            return (
              <div className="classProducts" key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <img
                    className="classImgProducts"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </Link>
                <p className="classTitleProducts">{item.title}</p>
                <p className="classPriceProducts">{item.price} $</p>
                <div className="addToBasketDiv">
                  <button
                    className="addToBasket"
                    onClick={() => handleAddToBasket(item)}
                  >
                    Add basket
                  </button>
                </div>
              </div>
            );
          })}
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

export default Home;
