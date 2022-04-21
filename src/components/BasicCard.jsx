import React from "react";
import { Link } from "react-router-dom";

const BasicCard = ({ name, image, artist, type, index, pathRelease, pathArtist }) => {
  return (
    <>
      <div className="basic__card" key={index}>
        <Link className="basic__card-link" to={pathRelease}>
          <div className="basic__image">
            <img src={image} alt={name} />
          </div>
        </Link>
        <div className="basic__info">
          <div className="basic__name">
            <p className="basic__name-text">{name}</p>
          </div>
          <div className="basic__row">
            <div className="basic__artist">
              <Link className="basic__artist-text" to={pathArtist}>
                {artist}
              </Link>
            </div>
            <div className="basic__type">
              <p className="basic__type-text">{type}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicCard;
