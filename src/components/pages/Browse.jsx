import React, { useEffect, useState } from "react";
import axios from "axios";

import Icon from "../Icon.jsx";

import Cross from "../../assets/icons/cancel.png";
import CrossActive from "../../assets/icons/cancel-gr.png";

const Browse = ({ dropdown }) => {
  const [browseArtist, setBrowseArtist] = useState("");
  const [browseTrack, setBrowseTrack] = useState("");
  const [browseAlbum, setBrowseAlbum] = useState("");
  const [browsePlaylist, setBrowsePlaylist] = useState("");
  const [title, setTitle] = useState("");

  const SPACE_DELIMITER = "%20";

  useEffect(() => {

  }, []);

  const getInputValue = (event) => {
    let token = localStorage.getItem("token");

    const value = event.target.value;
    const valueArray = value.split(" ");
    const query = valueArray.join(SPACE_DELIMITER);

    axios(`https://api.spotify.com/v1/search?q=${query}&type=artist%2Ctrack%2Calbum%2Cplaylist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((browseArtistResponse) => {
        console.log(browseArtistResponse.data);
        setBrowseArtist(browseArtistResponse.data);
      })

      .catch((error) => console.log(error));
  };

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
              <input type="text" onChange={getInputValue} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Browse;
