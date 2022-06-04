import React from "react";
import { Link } from "react-router-dom";

import NoPlaylist from "../../assets/images/no-playlist-image.jpg";

const FeaturedCard = ({ name, image, index, id }) => {
  return (
    <>
      <div className="basic__card featured__card" key={index}>
        <Link className="basic__card__link featured__card-link" to={`/playlist/${(id)}`}>
          <div className="basic__image featured__image">
            {image != null ? <img src={image} alt={name} /> : <img src={NoPlaylist} alt={name} />}
          </div>
        </Link>
        <div className="basic__info featured__info">
          <div className="basic__name featured__name">
            <p className="basic__name-text featured__name-text">{name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedCard;
