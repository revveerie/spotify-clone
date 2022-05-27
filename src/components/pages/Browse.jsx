import React from "react";

import Icon from "../Icon.jsx";

import Cross from "../../assets/icons/cancel.png";
import CrossActive from "../../assets/icons/cancel-gr.png";


const Browse = ({ dropdown }) => {
  return (
    <>
      <div className={dropdown ? "browse page hidden" : "browse page"}>
        <div className="browse__wrapper">
          <div className="browse__clear-wrapper">
            <div className="browse__clear-button">
              <Icon image={Cross} imageActive={CrossActive} />
            </div>
          </div>
          <div className="browse__input-wrapper">
            <div className="browse__input">
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Browse;
