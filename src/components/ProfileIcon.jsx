import React from "react";

const ProfileIcon = ({ profile }) => {
  return (
    <>
      <div className="profile__photo">
        <img src={profile} className="profile__photo-image" />
      </div>
    </>
  );
};

export default ProfileIcon;
