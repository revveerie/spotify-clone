import React, { useEffect, useState } from "react";
import axios from "axios";

import ReleasesCard from "../ReleasesCard.jsx";

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

  const getItem = (item, keyword) => {
    for (let key in item) {
      for (let innerKey in item[key]) {
        return item[key][keyword];
      }
    }
  };

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
                  <ReleasesCard
                    index={index}
                    image={getItem(item.images, "url")}
                    name={item.name}
                    artist={getItem(item.artists, "name")}
                    type={item.type}
                    pathRelease="/album"
                    pathArtist="/artist"
                    key={index}
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