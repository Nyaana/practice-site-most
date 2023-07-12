import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { fetchUsers } from "../../store/usersSlice";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
          <NavLink to="/Users" className="linkInUsers">
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

      <div className="classUsers">
        <div className="classConteinerUsers">
          {users.map((user) => (
            <>
              <div key={user.id} className="classConteinerInfoUsers">
                <Link to={`/users/${user.id}`}>
                  <img
                    src={user.image}
                    alt="Пользователь"
                    className="classUsersImg"
                  />
                </Link>
                <p></p>
                <Link to={`/users/${user.id}`} className="classNameUsers">
                  <p>{user.username}</p>
                </Link>
                <div className="classDivInfoUsers">
                  <Link to={`/users/${user.id}`} className="classInfoUsers">
                    <p>
                      Name: {user.firstName} {user.firstName}
                    </p>
                  </Link>
                  <Link to={`/users/${user.id}`} className="classInfoUsers">
                    <p>Age: {user.age}</p>
                  </Link>
                  <Link to={`/users/${user.id}`} className="classInfoUsers">
                    <p>Email: {user.email}</p>
                  </Link>
                </div>
              </div>
            </>
          ))}
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

export default Users;
