import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BasicCard from "../BasicCard.jsx";

const Albums = ({ dropdown }) => {
  const [albums, setAlbums] = useState("");

  const ALBUMS_ENDPOINT = "https://api.spotify.com/v1/me/albums";

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios(ALBUMS_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((albumsResponse) => {
        console.log(albumsResponse.data);
        setAlbums(albumsResponse.data);
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
      <div className={dropdown ? "albums page hidden" : "albums page"}>
        <div className="page__header">
          <div className="page__header-text">Albums</div>
        </div>
        {albums.total == 0 ? (
          <div className="no-follow">You don't have any saved albums, yet. Go to <Link to="/" className="no-follow__link">Explore</Link> page and find something new.</div>
        ) : (
          <div className="albums__wrapper">
            {albums?.items
              ? albums.items.map((item, index) => (
                  <div className="grid-item" key={index}>
                    <BasicCard
                      index={index}
                      image={getItem(item.album.images, "url")}
                      name={item.album.name}
                      artist={getItem(item.album.artists, "name")}
                      type={item.album.type}
                      pathRelease="/album"
                      pathArtist="/artist"
                      key={index}
                    />
                  </div>
                ))
              : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Albums;
