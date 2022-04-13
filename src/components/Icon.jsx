import React from "react";

const Icon = ({ image, imageActive }) => {
  return (
    <>
      <div className="icon">
        <img src={image} className="icon__image" />
        <img src={imageActive} className="icon__image-active" />
      </div>
    </>
  );
};

export default Icon;
