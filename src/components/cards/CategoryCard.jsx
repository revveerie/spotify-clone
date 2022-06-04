import React from "react";
import { Link } from "react-router-dom";

import NoPlaylist from "../../assets/images/no-playlist-image.jpg";

const CategoryCard = ({ name, image, index, id }) => {
  return (
    <>
      <div className="basic__card category__card" key={index}>
        <Link className="basic__card-link category__card-link" to={`/category/${id}`}>
          <div className="basic__image category__image">
            {image != null ? <img src={image} alt={name} /> : <img src={NoPlaylist} alt={name} />}
          </div>
        </Link>
        <div className="basic__info category__info">
          <div className="basic__name category__name">
            <p className="basic__name-text category__name-text">{name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
