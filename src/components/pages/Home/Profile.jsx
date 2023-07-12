import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.auth.user);

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
            <button className="buttonInProfile">Profile</button>
          </NavLink>
        </nav>
      </header>

      <div className="classProfile">
        <div className="classContainerProfile">
          {user ? (
            <>
              <img
                src={user.image}
                alt="Аватар"
                className="classAvatarProfile"
              />
              <div className="classContainerInfoProfile">
                <h1 className="classNameProfile">{user && user.username}</h1>
                <h2 className="classNameProfile">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="classInfoProfile">
                  <span>Gender: </span>
                  {user.gender}
                </p>
                <p className="classInfoProfile">
                  <span>Email: </span>
                  {user.email}
                </p>
                <p className="classInfoProfile">
                  <span>ID user: </span>
                  {user.id}
                </p>
              </div>
            </>
          ) : (
            <p className="classMessage">User is not found</p>
          )}
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

export default Profile;
