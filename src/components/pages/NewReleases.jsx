import React, { useEffect, useState } from "react";
import axios from "axios";

import BasicCard from "../cards/BasicCard.jsx";

import getItem from "../../helpers/getItem.js";

const NewReleases = ({ dropdown }) => {
  const [releases, setReleases] = useState("");

  const RELEASES_ENDPOINT = "https://api.spotify.com/v1/browse/new-releases?country=US&limit=50";

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios(RELEASES_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((releasesResponse) => {
        setReleases(releasesResponse.data.albums);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className={dropdown ? "new-releases page hidden" : "new-releases page"}>
        <div className="page__header">
          <div className="page__header-text">New releases</div>
        </div>
        <div className="new-releases__wrapper">
          {releases?.items
            ? releases.items.map((item, index) => (
                <div className="grid-item" key={index}>
                  <BasicCard
                    index={index}
                    image={getItem(item.images, "url")}
                    name={item.name}
                    artist={getItem(item.artists, "name")}
                    type={item.album_type}
                    pathArtist={`/artist/${getItem(item.artists, "id")}`}
                    key={index}
                    id={item.id}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default NewReleases;
