import React from "react";
import { Link } from "react-router-dom";

const FeaturedCard = ({ name, image, index, id }) => {
  return (
    <>
      <div className="category__card" key={index}>
        <Link className="category__card-link" to={`/playlist/${(id)}`}>
          <div className="category__image">
            <img src={image} alt={name} />
          </div>
        </Link>
        <div className="category__info">
          <div className="category__name">
            <p className="category__name-text">{name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedCard;
