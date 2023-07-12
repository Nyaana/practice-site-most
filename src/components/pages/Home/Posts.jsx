import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostAsync } from "../../store/postsSlice";
import { Navigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../store/authSlice";

function Posts() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const username = useSelector((state) => state.auth.user?.username);
  const userId = useSelector((state) => state.auth.user?.id);

  const handleAddPost = () => {
    const post = {
      title,
      content,
      username,
      userId,
    };
    dispatch(addPostAsync(post));
    setTitle("");
    setContent("");
  };

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
          <NavLink to="/Posts" className="linkInPosts">
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

      <div className="classPost">
        <div className="classContainerNewPosts">
          <h2 className="classTitleNewPosts">Add post</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="classNewPostsTitle"
          />
          <p></p>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="classNewPostsInfo"
          ></textarea>
          <p></p>
          <button onClick={handleAddPost} className="classBattonPosts">
            Добавить
          </button>
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

export default Posts;
