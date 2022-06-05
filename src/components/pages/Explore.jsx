import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ShowMore from "../ShowMore.jsx";

import Releases from "../sliders/Releases.jsx";
import Categories from "../sliders/Categories.jsx";
import Featured from '../sliders/Featured.jsx';

const Explore = ({ dropdown }) => {
  return (
    <>
      <div className={dropdown ? "explore page hidden" : "explore page"}>
        <div className="explore__slider releases">
          <div className="explore__header">
            <div className="explore__title">
              <p className="explore__title-text">New releases</p>
            </div>
            <ShowMore path="/new-releases" />
          </div>
          <div className="explore__cards">
            <Releases />
          </div>
        </div>
        <div className="explore__slider categories">
          <div className="explore__header">
            <div className="explore__title">
              <p className="explore__title-text">Categories</p>
            </div>
            <ShowMore path="/categories" />
          </div>
          <div className="explore__cards">
            <Categories />
          </div>
        </div>
        <div className="explore__slider featured">
          <div className="explore__header">
            <div className="explore__title">
              <p className="explore__title-text">Featured</p>
            </div>
            <ShowMore path="/featured" />
          </div>
          <div className="explore__cards">
            <Featured />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
