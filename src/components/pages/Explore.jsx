import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ShowMore from "../ShowMore.jsx";

import Releases from "../Releases.jsx";

const Explore = ({ dropdown }) => {
  return (
    <>
      <div className={dropdown ? "explore page hidden" : "explore page"}>
        <div className="explore__releases releases">
          <div className="releases__header">
            <div className="releases__title">
              <p className="releases__title-text">New releases</p>
            </div>
            <ShowMore path="/new-releases" />
          </div>
          <div className="releases__cards">
            <Releases dropdown={dropdown} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
