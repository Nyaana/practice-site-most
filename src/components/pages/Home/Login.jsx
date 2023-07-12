import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const credentials = { username, password };

    try {
      await dispatch(login(credentials));
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  };

  const getErrorMessage = () => {
    if (error === "Invalid credentials") {
      return "Login or password entered incorrectly";
    }
    return error;
  };

  const getWelcomeMessage = () => {
    if (user) {
      const { firstName, lastName } = user;
      return (
        <p>
          Welcome, {firstName} {lastName}!
        </p>
      );
    }
    return null;
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
          <NavLink to="/Login" className="linkInSignIn">
            Sign In
          </NavLink>
        </nav>
      </header>

      <div className="classLogin">
        <div className="classContainerAuth">
          <h1 className="classTitleSignIn">Login</h1>
          {error && <div className="classMessage">{getErrorMessage()}</div>}
          {isLoggedIn && user && (
            <div className="classMessage">{getWelcomeMessage()}</div>
          )}
          <form onSubmit={handleLogin} className="form">
            <div className="classFormGroup">
              <label htmlFor="username" className="classFormLabel">
                User name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="classFormInput"
                placeholder=" "
              />
            </div>
            <div className="classFormGroup">
              <label htmlFor="password" className="classFormLabel">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="classFormInput"
                placeholder=" "
              />
            </div>
            <button type="submit" className="classFormButton">
              Sign in
            </button>
          </form>
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

export default Login;
