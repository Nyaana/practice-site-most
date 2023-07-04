import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

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
    console.log("Отправляем запрос на сервер:", credentials);

    try {
      await dispatch(login(credentials));
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log("Ошибка:", error);
      setIsLoading(false);
    }
  };

  const getErrorMessage = () => {
    if (error === "Invalid credentials") {
      return "Неправильно введен логин или пароль";
    }
    return error;
  };

  const getWelcomeMessage = () => {
    if (user) {
      const { firstName, lastName } = user;
      return (
        <p>
          Добро пожаловать,
          <span>
            {} {firstName} {lastName}!
          </span>
        </p>
      );
    }
    return null;
  };

  return (
    <div className="classLogin">
      <div className="classContainerAuth">
        <h1 className="classTitleSignIn">Вход</h1>
        {error && <div className="classMessage">{getErrorMessage()}</div>}
        {isLoggedIn && user && (
          <div className="classMessage">{getWelcomeMessage()}</div>
        )}
        <form onSubmit={handleLogin} className="form">
          <div className="classFormGroup">
            <label htmlFor="username" className="classFormLabel">
              Имя пользователя
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
              Пароль
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
