import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <div className="page">
        <p>Profile</p>
        <div>
          <Link to="/playlists">playlists</Link>
        </div>
        <div>
          <Link to="/albums">albums</Link>
        </div>
        <div>
          <Link to="/artists">artists</Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
