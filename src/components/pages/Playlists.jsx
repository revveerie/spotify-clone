import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import PlaylistCard from "../cards/PlaylistCard.jsx";

import getItem from "../../helpers/getItem.js";

const Playlists = ({ dropdown }) => {
  const [playlists, setPlaylists] = useState("");
  const [saved, setSaved] = useState("");
  const [playlistsInfo, setPlaylistsInfo] = useState("");
  const [currentOffset, setCurrentOffset] = useState(0);
  const [fetch, setFetch] = useState(true);

  const SAVED_SONGS_ENDPOINT = "https://api.spotify.com/v1/me/tracks?limit=5";

  useEffect(() => {
    if (fetch) {
      let token = localStorage.getItem("token");

      axios(`https://api.spotify.com/v1/me/playlists?limit=50&offset=${currentOffset}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((playlistsResponse) => {
          setPlaylistsInfo(playlistsResponse.data);
          setPlaylists([...playlists, ...playlistsResponse.data.items]);
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

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios(SAVED_SONGS_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((savedResponse) => {
        setSaved(savedResponse.data);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className={dropdown ? "playlists page hidden" : "playlists page"}>
        <div className="page__header">
          <div className="page__header-text">Playlists</div>
        </div>
        <div className="playlists__wrapper">
          <Link className="playlists__saved grid-item" to="/songs">
            {saved?.items
              ? saved.items.map((image, index) =>
                  index == 0 ? (
                    <div className="playlists__last-saved-bg" key={index}>
                      <img src={getItem(image.track.album.images, "url")} />
                    </div>
                  ) : (
                    null
                  )
                )
              : null}
            <div className="playlists__saved-title-wrapper">
              <div className="playlists__saved-title">
                <p className="playlists__saved-title-text">Saved songs</p>
              </div>
              <div className="playlists__saved-amount">
                <p className="playlists__saved-amount-text">{saved.total} saved songs</p>
              </div>
            </div>
            <div className="playlists__last-saved last-saved">
              {saved?.items
                ? saved.items.map((item, index) => (
                    <div className="last-saved__item" key={index}>
                      <div className="last-saved__item-track">{item.track.name}</div>
                      <div className="last-saved__item-artist">
                        {getItem(item.track.artists, "name")}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </Link>
          {playlists
            ? playlists.map((item, index) => (
                <div className="grid-item" key={index}>
                  <PlaylistCard
                    index={index}
                    name={item.name}
                    image={getItem(item.images, "url")}
                    creator={item.owner.display_name}
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

export default Playlists;
