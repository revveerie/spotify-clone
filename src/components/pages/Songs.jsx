import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Icon from "../Icon.jsx";
import AudioWave from "../AudioWave.jsx";

import Shuffle from "../../assets/icons/shuffle-lg.png";
import ShuffleHover from "../../assets/icons/shuffle-gr.png";
import MainImage from "../../assets/images/saved.png";
import SavedTop from "../../assets/images/saved-top.png";

const Songs = ({ dropdown }) => {
  const [saved, setSaved] = useState("");
  const [current, setCurrent] = useState(null);

  const SAVED_SONGS_ENDPOINT = "https://api.spotify.com/v1/me/tracks?limit=50";

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
        console.log(savedResponse.data);
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

  const getInfo = (item, keyword) => {
    for (let key in item) {
      if (key == keyword) return item[key];
    }
  };

  const handleClick = (e) => {
    setCurrent(e);
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
                    {saved.total} songs
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
              {saved?.items
                ? saved.items.map((item, index) => (
                    <div
                      className={
                        current === item
                          ? "basic-page__track playlist__track active"
                          : "basic-page__track playlist__track"
                      }
                      key={index}
                      onClick={() => handleClick(item)}
                    >
                      <div className="basic-page__track-number playlist__track-number">
                        {current === item ? (
                          <AudioWave />
                        ) : (
                          <p className="basic-page__track-number-text">{index + 1}</p>
                        )}
                      </div>
                      <div className="basic-page__track-image playlist__track-image">
                        <img src={getItem(item.track.album.images, "url")} alt="" />
                      </div>
                      <div className="basic-page__track-title playlist__track-title">
                        <p className="basic-page__track-title-text">{item.track.name}</p>
                        <div className="playlist__row">
                          <Link className="playlist__track-title-artist" to="/artist/">
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

export default Songs;
