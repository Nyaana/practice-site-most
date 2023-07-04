import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="classProfile">
      <div className="classContainerProfile">
        <h1 className="classTitleProfile">Профиль</h1>
        {user ? (
          <>
            <img src={user.image} alt="Аватар" className="classAvatarProfile" />
            <div className="classContainerInfoProfile">
              <h1 className="classNameProfile">{user && user.username}</h1>
              <h2 className="classNameProfile">
                {user.firstName} {user.lastName}
              </h2>
              <p className="classInfoProfile">
                <span>Пол:</span>
                {user.gender}
              </p>
              <p className="classInfoProfile">
                <span>Email:</span>
                {user.email}
              </p>
              <p className="classInfoProfile">
                <span>ID пользователя:</span>
                {user.id}
              </p>
            </div>
          </>
        ) : (
          <p className="classMessage">Пользователь не найден</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
