import React from "react";
import { Link } from "react-router-dom";

const ArtistCard = ({ name, image, artist, type, index, pathArtist }) => {
  return (
    <>
      <div className="basic__card artist__card" key={index}>
        <Link className="basic__card-link artist__card-link" to={pathArtist}>
          <div className="basic__image artist__image">
            <img src={image} alt={name} />
          </div>
        </Link>
        <div className="basic__info artist__info">
          <div className="basic__artist artist__artist">
            <Link className="basic__artist-text artist__artist-text" to={pathArtist}>
              {artist}
            </Link>
          </div>
          <div className="basic__type artist__type">
            <p className="basic__type-text artist__type-text">{type}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistCard;
