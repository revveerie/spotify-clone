import React from "react";
import { Link } from "react-router-dom";

import NoAlbum from "../../assets/images/no-album-image.jpg";

const BasicCard = ({ name, image, artist, type, index, id, pathArtist }) => {
  return (
    <>
      <div className="basic__card" key={index}>
        <Link className="basic__card-link" to={`/album/${id}`}>
          <div className="basic__image">
            {image != null ? <img src={image} alt={name} /> : <img src={NoAlbum} alt={name} />}
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
