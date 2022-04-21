import React from "react";
import { Link } from "react-router-dom";

const PlaylistCard = ({ name, image, index, pathPlaylist, creator }) => {
  return (
    <>
      <div className="basic__card playlist__card" key={index}>
        <Link className="basic__card-link playlist__card-link" to={pathPlaylist}>
          <div className="basic__image playlist__image">
            <img src={image} alt={name} />
          </div>
        </Link>
        <div className="basic__info playlist__info">
          <div className="basic__name playlist__name">
            <p className="basic__name-text playlist__name-text">{name}</p>
          </div>
          <div className="playlist__creator">
            <p className="playlist__creator-text">{creator}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistCard;
