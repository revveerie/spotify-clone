import React, { useState } from "react";

const AlbumPlayer = ({ index, name, duration, item }) => {
  const [current, setCurrent] = useState(null);

  const handleClick = (e) => {
    setCurrent(e);
  };

  return (
    <>
      <div onClick={() => handleClick(item)} className={current === item ? "album__track active" : "album__track"}>
        <div className="album__track-number">
          <p className="album__track-number-text">{index + 1}</p>
        </div>
        <div className="album__track-title">
          <p className="album__track-title-text">{name}</p>
        </div>
        <div className="album__track-duration">
          <p className="album__track-duration-text">{duration}</p>
        </div>
      </div>
    </>
  );
};

export default AlbumPlayer;
