import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AlbumCard from "../cards/AlbumCard.jsx";

import getItem from "../../helpers/getItem.js";

import NoFollow from "../../assets/icons/music-album-dg.png";

const Albums = ({ dropdown }) => {
  const [albums, setAlbums] = useState("");
  const [albumsInfo, setAlbumsInfo] = useState("");
  const [currentOffset, setCurrentOffset] = useState(0);
  const [fetch, setFetch] = useState(true);

  const ALBUMS_ENDPOINT = "https://api.spotify.com/v1/me/albums";

  useEffect(() => {
    if (fetch) {
      let token = localStorage.getItem("token");

      axios(`https://api.spotify.com/v1/me/albums?limit=50&offset=${currentOffset}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((albumsResponse) => {
          setAlbumsInfo(albumsResponse.data);
          setAlbums([...albums, ...albumsResponse.data.items]);
          setCurrentOffset((prevState) => prevState + 50);
        })
        .finally(() => setFetch(false))

        .catch((error) => console.log(error));
    }
  }, [fetch]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetch(true);
    }
  };

  return (
    <>
      <div className={dropdown ? "albums page hidden" : "albums page"}>
        <div className="page__header">
          <div className="page__header-text">Followed albums</div>
        </div>
        {albums.total == 0 ? (
          <div className="no-follow">
            <div className="no-follow__image">
              <img src={NoFollow} />
            </div>
            <div className="no-follow__text">Follow your first album</div>
            <div className="show-more__button">
              <Link to="/" className="show-more__button-link">
                Explore
              </Link>
            </div>
          </div>
        ) : (
          <div className="albums__wrapper">
            {albums
              ? albums.map((item, index) => (
                  <div className="grid-item" key={index}>
                    <AlbumCard
                      index={index}
                      image={getItem(item.album.images, "url")}
                      name={item.album.name}
                      artist={getItem(item.album.artists, "name")}
                      pathArtist={`/artist/${getItem(item.album.artists, "id")}`}
                      albumId={item.album.id}
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
