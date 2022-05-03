import React from "react";
import { Link } from "react-router-dom";

const ArtistAlbumCard = ({ name, image, index, pathAlbum }) => {
  return (
    <>
      <div className="basic__card basic__card" key={index}>
        <Link className="basic__card-link basic__card-link" to={pathAlbum}>
          <div className="basic__image basic__image">
            <img src={image} alt={name} />
          </div>
        </Link>
        <div className="basic__info basic__info">
          <div className="basic__name basic__name">
            <p className="basic__name-text basic__name-text">{name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistAlbumCard;
