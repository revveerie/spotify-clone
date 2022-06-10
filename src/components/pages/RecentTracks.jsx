import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Icon from "../Icon.jsx";
import AudioWave from "../AudioWave.jsx";
import Player from "../Player.jsx";

import RecentTop from "../../assets/images/recently-played-top.png";
import RecentImage from "../../assets/images/recently-played.png";
import NoAlbum from "../../assets/images/no-album-image.jpg";
import TickNotSaved from "../../assets/icons/tick-lg.png";
import TickSaved from "../../assets/icons/tick-gr.png";


const Recent = ({ dropdown }) => {
  const [current, setCurrent] = useState(null);
  const [isSaved, setIsSaved] = useState("");
  const [currentSaved, setCurrentSaved] = useState(null);
  const [recent, setRecent] = useState("");
  const [moreTopArtists, setMoreTopArtists] = useState(false);
  const [moreTopTracks, setMoreTopTracks] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((recentResponse) => {
        console.log(recentResponse.data.items);
        setRecent(recentResponse.data.items);
      })
      .catch((error) => console.log(error));
  }, [])

  const getItem = (item, keyword) => {
    for (let key in item) {
      for (let innerKey in item[key]) {
        return item[key][keyword];
      }
    }
  };

  const handleClick = (e) => {
    setCurrent(e);
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
        setIsSaved(false);
      })

      .catch((error) => console.log(error));
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

  const onMoreTopArtists = () => {
    moreTopArtists == false ? setMoreTopArtists(true) : setMoreTopArtists(false);
  };

  const onMoreTopTracks = () => {
    moreTopTracks == false ? setMoreTopTracks(true) : setMoreTopTracks(false);
  };

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  return (
    <>
      <div className={dropdown ? "player-hidden" : "player"}>
        <Player trackUri={playingTrack?.uri} />
      </div>
      <div className={dropdown ? "songs page hidden" : "songs page"}>
        <div className="basic-page__top songs__top">
          <img src={RecentTop} />
        </div>
        <div className="basic-page__content">
          <div className="container">
            <div className="basic-page__info">
              <div className="basic-page__info-image">
                <img src={RecentImage} />
              </div>
              <div className="basic-page__info-content info-content">
                <div className="info-content__type">
                  <p className="info-content__type-text">Playlist</p>
                </div>
                <div className="info-content__title">
                  <p className="info-content__title-text">Recently played</p>
                </div>
              </div>
            </div>
            <div className="basic-page__tracks">
            {recent
              ? recent.map((item, index) => (
                  <div
                    className={
                      current === item
                        ? "basic-page__track playlist__track active"
                        : "basic-page__track playlist__track"
                    }
                    key={index}
                    onMouseLeave={() => handleOutSaved()}
                    onMouseEnter={() => handleClickSaved(item, item.track.id)}
                    onClick={() => chooseTrack(item.track)}
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
                    <div
                      className="basic-page__track-title playlist__track-title"
                      onClick={() => handleClick(item)}
                    >
                      <p className="basic-page__track-title-text">{item.track.name}</p>
                      <div className="playlist__row">
                        <Link
                          className="playlist__track-title-artist"
                          to={`/artist/${getItem(item.track.artists, "id")}`}
                        >
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
                    <div
                      className="basic-page__track-saved"
                      onClick={() =>
                        isSaved ? onRemoveTrack(item, item.id) : onSaveTrack(item, item.id)
                      }
                    >
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

export default Recent;
