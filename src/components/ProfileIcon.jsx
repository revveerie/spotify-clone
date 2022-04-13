import React from "react";

import NoPhoto from '../assets/icons/avatar.png';

const ProfileIcon = ({ profile }) => {
  return (
    <>
      <div className="profile__photo">
        {profile != null ? (
          <img src={profile} className="profile__photo-image" />
        ) : (
          <div className="profile__no-photo">
            <img src={NoPhoto} className="profile__no-photo-image" />
          </div>
        )}
        
      </div>
    </>
  );
};

export default ProfileIcon;
