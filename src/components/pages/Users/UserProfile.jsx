import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchUserPosts } from "../../store/usersSlice";

function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const posts = useSelector((state) => state.users.posts);
  const comments = useSelector((state) => state.users.comments);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const user = users.find((user) => user.id === +userId);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchUserPosts(userId));
  }, [dispatch, userId]);

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

      <div className="classUserProfile">
        {user ? (
          <div>
            <div className="classContainerUserProfile">
              <img
                src={user.image}
                alt="User"
                className="classUserProfileImg"
              />
              <div className="classUserProfileInfo">
                <h3 className="classNameUserProfile">{user.username}</h3>
                <p className="classInfoUserProfile">
                  <span>Name: </span>
                  {user.firstName} {user.lastName}
                </p>
                <p className="classInfoUserProfile">
                  <span>Email: </span>
                  {user.email}
                </p>
                <p className="classInfoUserProfile">
                  <span>Age: </span>
                  {user.age}
                </p>
              </div>
            </div>

            <div>
              {posts.map((post) => (
                <div key={post.id}>
                  <div className="classContainerPostUserProfile">
                    <h5 className="classPostTitleUserProfile">{post.title}</h5>
                    <p className="classPostUserProfile">{post.body}</p>
                  </div>

                  {comments
                    .filter((comment) => comment.postId === post.id)
                    .map((comment) => (
                      <div
                        key={comment.id}
                        className="classContainerCommentUserProfile"
                      >
                        <div></div>
                        {comment.user && comment.user.image && (
                          <img
                            src={comment.user.image}
                            alt="User"
                            className="classContainerImgCommentUserProfile"
                          />
                        )}
                        <div className="classContainerInfoCommentUserProfile">
                          {comment.user && (
                            <h5 className="classContainerNameInfoCommentUserProfile">
                              {comment.user.username}
                            </h5>
                          )}
                          <p className="classContainerCommentInfoCommentUserProfile">
                            {comment.body}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>User not found.</p>
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

export default UserProfile;
