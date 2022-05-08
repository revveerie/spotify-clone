import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Icon from "../Icon.jsx";
import AudioWave from "../AudioWave.jsx";

import Shuffle from "../../assets/icons/shuffle-lg.png";
import ShuffleHover from "../../assets/icons/shuffle-gr.png";
import Save from "../../assets/icons/tick-gr.png";
import NoPlaylist from "../../assets/images/no-playlist-image.jpg";
import NoAlbum from "../../assets/images/no-album-image.jpg";
import TickNotSaved from "../../assets/icons/tick-lg.png";
import TickSaved from "../../assets/icons/tick-gr.png";

const Playlist = ({ dropdown }) => {
  const [user, setUser] = useState("");
  const [playlist, setPlaylist] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState("");
  const [save, setSave] = useState(false);
  const [saveTrack, setSaveTrack] = useState(false);
  const [remove, setRemove] = useState(false);
  const [removeTrack, setRemoveTrack] = useState(false);
  const [current, setCurrent] = useState(null);
  const { id } = useParams();
  const [currentOffset, setCurrentOffset] = useState(0);
  const [fetch, setFetch] = useState(true);
  const [isFollow, setIsFollow] = useState("");
  const [isSaved, setIsSaved] = useState("");
  const [currentSaved, setCurrentSaved] = useState(null);

  const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${id}`;

  useEffect(() => {
    if (fetch) {
      let token = localStorage.getItem("token");

      axios(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=50&offset=${currentOffset}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((playlistTracksResponse) => {
          setPlaylistTracks([...playlistTracks, ...playlistTracksResponse.data.items]);
          setCurrentOffset((prevState) => prevState + 50);
        })
        .finally(() => setFetch(false))
        .catch((error) => console.log(error));
    }
  }, [fetch]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((userResponse) => {
        setUser(userResponse.data.id);
        axios(
          `https://api.spotify.com/v1/playlists/${id}/followers/contains?ids=${userResponse.data.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
          .then((isFollowResponse) => {
            setIsFollow(isFollowResponse.data[0]);
          })

          .catch((error) => console.log(error));
      })

      .catch((error) => console.log(error));

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

    axios(PLAYLIST_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((playlistResponse) => {
        setPlaylist(playlistResponse.data);
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

  const getInfo = (item, keyword) => {
    for (let key in item) {
      if (key == keyword) return item[key];
    }
  };

  const getTimeMinSec = (time) => {
    let min = time / 1000 / 60;
    let r = min % 1;
    let sec = Math.floor(r * 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
    min = Math.floor(min);
    return `${min}:${sec}`;
  };

  const handleClick = (e) => {
    setCurrent(e);
  };

  const onSave = () => {
    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/playlists/${id}/followers`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((saveResponse) => {
        setSave(saveResponse.data);
        setIsFollow(true);
      })

      .catch((error) => console.log(error));
  };

  const onRemove = () => {
    let token = localStorage.getItem("token");

    axios(`	https://api.spotify.com/v1/playlists/${id}/followers`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((removeResponse) => {
        setRemove(removeResponse.data);
        setIsFollow(false);
      })

      .catch((error) => console.log(error));
  };

  const handleClickSaved = (e, id) => {
    setCurrentSaved(e);

    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/me/tracks/contains?ids=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((isSavedResponse) => {
        setIsSaved(isSavedResponse.data[0]);
      })

      .catch((error) => console.log(error));
  };

  const handleOutSaved = () => {
    setCurrentSaved();
  };

  const onSaveTrack = (e, id) => {
    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((saveTrackResponse) => {
        setSaveTrack(saveTrackResponse.data);
        setIsSaved(true);
      })

      .catch((error) => console.log(error));
  };

  const onRemoveTrack = (e, id) => {
    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((removeTrackResponse) => {
        setRemoveTrack(removeTrackResponse.data);
        setIsSaved(false);
      })

      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={dropdown ? "playlist page hidden" : "album page"}>
        <div className="basic-page__top">
          {getItem(playlist.images, "url") ? (
            <img src={getItem(playlist.images, "url")} />
          ) : (
            <img src={NoPlaylist} />
          )}
        </div>
        <div className="basic-page__content">
          <div className="container">
            <div className="basic-page__info">
              <div className="basic-page__info-image">
                {getItem(playlist.images, "url") ? (
                  <img src={getItem(playlist.images, "url")} />
                ) : (
                  <img src={NoPlaylist} />
                )}
              </div>
              <div className="basic-page__info-content info-content">
                <div className="info-content__type">
                  <p className="info-content__type-text">Playlist</p>
                </div>
                <div className="info-content__title">
                  <p className="info-content__title-text">{playlist.name}</p>
                </div>
                <div className="info-content__row">
                  <Link
                    className="info-content__row-text info-content__row-text_artist"
                    to="/profile"
                  >
                    {getInfo(playlist.owner, "display_name")}
                  </Link>
                  <p className="info-content__row-text info-content__row-text_number playlist__row-text_number">
                    {getInfo(playlist.tracks, "total")} songs
                  </p>
                </div>
                <div className="info-content__buttons">
                  <div className="info-content__button  info-content__button_play_m">
                    <div className="info-content__button-icon">
                      <Icon image={Shuffle} imageActive={ShuffleHover}></Icon>
                    </div>
                    <div className="info-content__button-text">Play</div>
                  </div>
                  {getInfo(playlist.owner, "id") != user ? (
                    <div
                      className="info-content__button info-content__button_save"
                      onClick={isFollow ? onRemove : onSave}
                    >
                      {isFollow ? (
                        <>
                          <div className="info-content__button-icon">
                            <Icon image={Save} imageActive={Save}></Icon>
                          </div>
                          <div className="info-content__button-text">Saved</div>
                        </>
                      ) : (
                        <div className="info-content__button-text">Save</div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="basic-page__tracks">
              {playlistTracks
                ? playlistTracks.map((item, index) => (
                    <div
                      className={
                        current === item
                          ? "basic-page__track playlist__track active"
                          : "basic-page__track playlist__track"
                      }
                      key={index}
                      onMouseLeave = {() => handleOutSaved()}
                      onMouseEnter={() => handleClickSaved(item, item.track.id)}
                    >
                      <div className="basic-page__track-number playlist__track-number">
                        {current === item ? (
                          <AudioWave />
                        ) : (
                          <p className="basic-page__track-number-text">{index + 1}</p>
                        )}
                      </div>
                      <div className="basic-page__track-image playlist__track-image">
                        {getItem(item.track.album.images, "url") ? (
                          <img src={getItem(item.track.album.images, "url")} alt="" />
                        ) : (
                          <img src={NoAlbum} alt="" />
                        )}
                      </div>
                      <div className="basic-page__track-title playlist__track-title" onClick={() => handleClick(item)}>
                        <p className="basic-page__track-title-text">{item.track.name}</p>
                        <div className="playlist__row">
                          <Link className="playlist__track-title-artist" to={`/artist/${getItem(item.track.artists, "id")}`}>
                            {getItem(item.track.artists, "name")}
                          </Link>
                          <Link
                            className="playlist__track-title-artist playlist__track-title-album"
                            to={`/album/${getInfo(item.track.album, "id")}`}
                          >
                            {getInfo(item.track.album, "name")}
                          </Link>
                        </div>
                      </div>
                      <div className="basic-page__track-saved" onClick={() => isSaved ? onRemoveTrack(item, item.track.id) : onSaveTrack(item, item.track.id)}>
                        {currentSaved === item ? (
                          isSaved ? (
                            <>
                              <div className="basic-page__icon-wrapper">
                                <div className="basic-page__icon">
                                  <Icon image={TickSaved} imageActive={TickSaved} />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="basic-page__icon-wrapper">
                                <div className="basic-page__icon">
                                  <Icon image={TickNotSaved} imageActive={TickNotSaved} />
                                </div>
                              </div>
                            </>
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="basic-page__track-duration playlist__track-duration">
                        <p className="basic-page__track-duration-text">
                          {getTimeMinSec(Number(item.track.duration_ms))}
                        </p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
