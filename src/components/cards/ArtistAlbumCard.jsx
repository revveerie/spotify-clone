import React from "react";
import { Link } from "react-router-dom";

import NoAlbum from "../../assets/images/no-album-image.jpg";

const ArtistAlbumCard = ({ name, image, index, pathAlbum }) => {
  return (
    <>
      <div className="basic__card artist-album__card" key={index}>
        <Link className="basic__card-link artist-album__card-link" to={pathAlbum}>
          <div className="basic__image artist-album__image">
            {image != null ? <img src={image} alt={name} /> : <img src={NoAlbum} alt={name} />}
          </div>
        </Link>
        <div className="basic__info artist-album__info">
          <div className="basic__name artist-album__name">
            <p className="basic__name-text artist-album__name-text">{name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistAlbumCard;
