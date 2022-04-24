import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import PlaylistCard from "../PlaylistCard.jsx";

const Playlists = ({ dropdown }) => {
  const [playlists, setPlaylists] = useState("");
  const [saved, setSaved] = useState("");

  let savedBackground = true;

  const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
  const SAVED_SONGS_ENDPOINT = "https://api.spotify.com/v1/me/tracks?limit=5";

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios(PLAYLISTS_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((playlistsResponse) => {
        setPlaylists(playlistsResponse.data);
      })

      .catch((error) => console.log(error));

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

  const getItem = (item, keyword) => {
    for (let key in item) {
      for (let innerKey in item[key]) {
        return item[key][keyword];
      }
    }
  };

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
                    (savedBackground = false)
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
          {playlists?.items
            ? playlists.items.map((item, index) => (
                <div className="grid-item" key={index}>
                  <PlaylistCard
                    index={index}
                    name={item.name}
                    image={getItem(item.images, "url")}
                    pathPlaylist="/playlists"
                    creator={item.owner.display_name}
                    pathCreator="/user-profile"
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
