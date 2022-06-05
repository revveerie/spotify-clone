import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Icon from "../Icon.jsx";
import AudioWave from "../AudioWave.jsx";

import getItem from "../../helpers/getItem.js";
import getInfo from "../../helpers/getInfo.js";
import getTimeMinSec from "../../helpers/getTimeMinSec.js";

import Shuffle from "../../assets/icons/shuffle-lg.png";
import ShuffleHover from "../../assets/icons/shuffle-gr.png";
import MainImage from "../../assets/images/saved.png";
import SavedTop from "../../assets/images/saved-top.png";
import NoAlbum from "../../assets/images/no-album-image.jpg";
import TickNotSaved from "../../assets/icons/tick-lg.png";
import TickSaved from "../../assets/icons/tick-gr.png";

const Songs = ({ dropdown }) => {
  const [saved, setSaved] = useState([]);
  const [savedInfo, setSavedInfo] = useState("");
  const [current, setCurrent] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [fetch, setFetch] = useState(true);
  const [isSaved, setIsSaved] = useState("");
  const [currentSaved, setCurrentSaved] = useState(null);
  const [saveTrack, setSaveTrack] = useState(false);
  const [removeTrack, setRemoveTrack] = useState(false);

  useEffect(() => {
    if (fetch) {
      let token = localStorage.getItem("token");

      axios(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${currentOffset}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((savedResponse) => {
          setSavedInfo(savedResponse.data);
          setSaved([...saved, ...savedResponse.data.items]);
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
        setRemoveTrack(removeTrackResponse.data);
        setIsSaved(false);
      })

      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={dropdown ? "songs page hidden" : "songs page"}>
        <div className="basic-page__top songs__top">
          <img src={SavedTop} />
        </div>
        <div className="basic-page__content">
          <div className="container">
            <div className="basic-page__info">
              <div className="basic-page__info-image">
                <img src={MainImage} />
              </div>
              <div className="basic-page__info-content info-content">
                <div className="info-content__type">
                  <p className="info-content__type-text">Playlist</p>
                </div>
                <div className="info-content__title">
                  <p className="info-content__title-text">Saved songs</p>
                </div>
                <div className="info-content__row">
                  <p className="info-content__row-text info-content__row-text_number">
                    {savedInfo.total} songs
                  </p>
                </div>
                <div className="info-content__buttons">
                  <div className="info-content__button info-content__button_play">
                    <div className="info-content__button-icon">
                      <Icon image={Shuffle} imageActive={ShuffleHover}></Icon>
                    </div>
                    <div className="info-content__button-text">Play</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basic-page__tracks">
              {saved
                ? saved.map((item, index) => (
                    <div
                      className={current === item ? "basic-page__track active" : "basic-page__track"}
                      key={index}
                      onMouseLeave={() => handleOutSaved()}
                      onMouseEnter={() => handleClickSaved(item, item.track.id)}
                    >
                      <div className="basic-page__track-number">
                        {current === item ? (
                          <AudioWave />
                        ) : (
                          <p className="basic-page__track-number-text">{index + 1}</p>
                        )}
                      </div>
                      <div className="basic-page__track-image">
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
                        <div className="basic-page__row">
                          <Link
                            className="basic-page__track-title-artist"
                            to={`/artist/${getItem(item.track.artists, "id")}`}
                          >
                            {getItem(item.track.artists, "name")}
                          </Link>
                          <Link
                            className="basic-page__track-title-artist basic-page__track-title-album"
                            to={`/album/${getInfo(item.track.album, "id")}`}
                          >
                            {getInfo(item.track.album, "name")}
                          </Link>
                        </div>
                      </div>
                      <div
                        className="basic-page__track-saved"
                        onClick={() =>
                          isSaved
                            ? onRemoveTrack(item, item.track.id)
                            : onSaveTrack(item, item.track.id)
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
                      <div className="basic-page__track-duration">
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

export default Songs;
