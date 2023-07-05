import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store/postsSlice";
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
  const posts = useSelector((state) => state.posts);

  const handleAddPost = () => {
    const post = {
      title,
      content,
      username,
    };
    dispatch(addPost(post));
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
          <NavLink to="/Posts" className="linkInPosts">
            Posts
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

      <div className="classDivNewPosts">
        <h2 className="classTitleNewPosts">Добавить пост</h2>
        <div className="classContainerNewPosts">
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="classNewPostsTitle"
          />
          <p></p>
          <textarea
            placeholder="Содержание"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="classNewPostsInfo"
          ></textarea>
          <p></p>
          <button onClick={handleAddPost} className="classBattonPostst">
            Добавить
          </button>
        </div>
      </div>

      <div className="classPosts">
        <h2 className="classTitlePosts">Список постов</h2>
        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <div key={post.id}>
                <img
                  src={user.image}
                  alt="Аватар"
                  className="classAvatarPost"
                />
                <div className="classContainerPost">
                  <h3 className="classTitlePost">{post.title}</h3>
                  <p className="classInfoPost">{post.content}</p>
                  <p className="classAuthorPost">Автор: {post.username}</p>
                  <p></p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="classMassagePosts">Посты отсутствуют.</p>
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

export default Posts;
