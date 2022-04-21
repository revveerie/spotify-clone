import React from "react";
import { Link } from "react-router-dom";

const RecommendedCard = ({ name, image, index, pathAlbum , year, description}) => {
  return (
    <>
      <div className="basic__card recommended__card" key={index}>
        <Link className="basic__card-link recommended__card-link" to={pathAlbum}>
          <div className="basic__image recommended__image">
            <img src={image} alt={name} />
          </div>
        </Link>
        <div className="basic__info recommended__info">
        <div className="recommended__title">
            <p className="recommended__title-text">Recommended albums</p>
          </div>
          <div className="basic__name recommended__name">
            <p className="basic__name-text recommended__name-text">{name}</p>
          </div>
          <div className="recommended__year">
            <p className="recommended__year-text">{year}</p>
          </div>
          <div className="recommended__description">
            <p className="recommended__description-text">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendedCard;
