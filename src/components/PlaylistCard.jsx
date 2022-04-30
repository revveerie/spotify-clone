import React from "react";
import { Link } from "react-router-dom";

import NoPlaylist from "../assets/images/no-playlist-image.jpg";

const PlaylistCard = ({ name, image, index, id, creator }) => {
  return (
    <>
      <div className="basic__card playlist__card" key={index}>
        <Link className="basic__card-link playlist__card-link" to={`/playlist/${id}`}>
          <div className="basic__image playlist__image">
            {image != null ? <img src={image} alt={name} /> : <img src={NoPlaylist} alt={name} />}
          </div>
        </Link>
        <div className="basic__info playlist__info">
          <div className="basic__name playlist__name">
            <p className="basic__name-text playlist__name-text">{name}</p>
          </div>
          <div className="playlist__creator">
            <p className="playlist__creator-text">by {creator}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistCard;
