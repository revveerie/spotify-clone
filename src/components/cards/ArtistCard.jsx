import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import NoArtist from "../../assets/images/no-artist-image.jpg";

const ArtistCard = ({ image, artist, type, index, id }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState("");

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
    window.addEventListener("resize", function () {
      ref.current ? setWidth(ref.current.offsetWidth) : false;
    });
  }, []);

  const mystyle = {
    height: `${width}px`,
  };

  return (
    <>
      <div className="basic__card artist__card" key={index}>
        <Link className="basic__card-link artist__card-link" to={`/artist/${id}`}>
          <div className="basic__image artist__image">
            {image != null ? (
              <img src={image} alt={name} ref={ref} style={mystyle} />
            ) : (
              <img src={NoArtist} alt={name} ref={ref} style={mystyle} />
            )}
          </div>
        </Link>
        <div className="basic__info artist__info">
          <div className="basic__artist artist__artist">
            <p className="basic__artist-text artist__artist-text">{artist}</p>
          </div>
          <div className="basic__type artist__type">
            <p className="basic__type-text artist__type-text">{type}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistCard;
