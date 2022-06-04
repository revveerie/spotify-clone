import React from "react";
import { Link } from "react-router-dom";

import NoAlbum from "../../assets/images/no-album-image.jpg";

const AlbumCard = ({ name, image, artist, index, pathArtist, albumId }) => {
  return (
    <>
      <div className="basic__card album__card" key={index}>
        <Link className="basic__card-link album__card-link" to={`/album/${albumId}`} key={albumId}>
          <div className="basic__image album__image">
            {image != null ? <img src={image} alt={name} /> : <img src={NoAlbum} alt={name} />}
          </div>
        </Link>
        <div className="basic__info album__info">
          <div className="basic__name album__name">
            <p className="basic__name-text album__name-text">{name}</p>
          </div>
          <div className="basic__row album__row">
            <div className="basic__artist album__artist">
              <Link className="basic__artist-text album__artist-text" to={pathArtist}>
                {artist}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumCard;
