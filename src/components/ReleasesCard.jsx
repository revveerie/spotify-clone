import React from "react";
import { Link } from "react-router-dom";

const ReleasesCard = ({ name, image, artist, type, index, pathRelease, pathArtist }) => {
  return (
    <>
      <div className="releases__card" key={index}>
        <Link className="releases__card-link" to={pathRelease}>
          <div className="releases__image">
            <img src={image} alt={name} />
          </div>
        </Link>
        <div className="releases__info">
          <div className="releases__name">
            <p className="releases__name-text">{name}</p>
          </div>
          <div className="releases__row">
            <div className="releases__artist">
              <Link className="releases__artist-text" to={pathArtist}>
                {artist}
              </Link>
            </div>
            <div className="releases__type">
              <p className="releases__type-text">{type}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReleasesCard;
