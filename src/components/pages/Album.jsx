import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Icon from "../Icon.jsx";
import AudioWave from "../AudioWave.jsx";

import Shuffle from "../../assets/icons/shuffle-lg.png";
import ShuffleHover from "../../assets/icons/shuffle-gr.png";
import Save from "../../assets/icons/tick-gr.png";
import NoAlbum from "../../assets/images/no-album-image.jpg";

const Album = ({ dropdown }) => {
  const [album, setAlbum] = useState("");
  const [albumTracks, setAlbumTracks] = useState("");
  const [save, setSave] = useState(false);
  const [current, setCurrent] = useState(null);
  const { albumId } = useParams();
  const [currentOffset, setCurrentOffset] = useState(0);
  const [fetch, setFetch] = useState(true);

  const ALBUM_ENDPOINT = `https://api.spotify.com/v1/albums/${albumId}`;
  useEffect(() => {
    if (fetch) {
      let token = localStorage.getItem("token");

      axios(`https://api.spotify.com/v1/albums/${albumId}/tracks?offset=${currentOffset}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((albumTracksResponse) => {
          setAlbumTracks([...albumTracks, ...albumTracksResponse.data.items]);
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

    axios(ALBUM_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((albumResponse) => {
        setAlbum(albumResponse.data);
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

  const getTimeMin = (time) => {
    let min = time / 1000 / 60;
    let r = min % 1;
    let sec = Math.floor(r * 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
    min = Math.floor(min);
    if (min <= 60) return `${min} min`;
    else {
      let hours = Math.trunc(min / 60);
      let minutes = min % 60;
      return `${hours} h ${minutes} min`;
    }
  };

  const onSave = () => {
    save == false ? setSave(true) : setSave(false);
  };

  const handleClick = (e) => {
    setCurrent(e);
  };

  return (
    <>
      <div className={dropdown ? "album page hidden" : "album page"}>
        <div className="basic-page__top album__top">
          <img src={getItem(album.images, "url")} />
        </div>
        <div className="basic-page__content album__content">
          <div className="container">
            <div className="basic-page__info album__info">
              <div className="basic-page__info-image album__info-image">
                {getItem(album.images, "url") ? (
                  <img src={getItem(album.images, "url")} />
                ) : (
                  <img src={NoAlbum} />
                )}
              </div>
              <div className="basic-page__info-content album__info-content info-content">
                <div className="info-content__type">
                  <p className="info-content__type-text">{album.album_type}</p>
                </div>
                <div className="info-content__title">
                  <p className="info-content__title-text">{album.name}</p>
                </div>
                <div className="info-content__row">
                  <Link
                    className="info-content__row-text info-content__row-text_artist"
                    to="/artist"
                  >
                    {getItem(album.artists, "name")}
                  </Link>
                  <p className="info-content__row-text info-content__row-text_date">
                    {String(album.release_date).slice(0, 4)}
                  </p>
                  <p className="info-content__row-text info-content__row-text_number">
                    {album.total_tracks} songs,
                  </p>
                  <p className="info-content__row-text info-content__row-text_time">
                    {getTimeMin(
                      albumTracks
                        ? albumTracks.reduce(
                            (totalDuration, albumTrack) => totalDuration + albumTrack.duration_ms,
                            0
                          )
                        : null
                    )}
                  </p>
                </div>
                <div className="info-content__buttons">
                  <div className="info-content__button info-content__button_play">
                    <div className="info-content__button-icon">
                      <Icon image={Shuffle} imageActive={ShuffleHover}></Icon>
                    </div>
                    <div className="info-content__button-text">Play</div>
                  </div>
                  <div className="info-content__button info-content__button_save" onClick={onSave}>
                    {save ? (
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
                </div>
              </div>
            </div>
            <div className="basic-page__tracks album__tracks">
              {albumTracks
                ? albumTracks.map((item, index) => (
                    <div
                      className={
                        current === item
                          ? "basic-page__track album__track active"
                          : "basic-page__track album__track"
                      }
                      key={index}
                      onClick={() => handleClick(item)}
                    >
                      <div className="basic-page__track-number album__track-number">
                        {current === item ? (
                          <AudioWave />
                        ) : (
                          <p className="basic-page__track-number-text album__track-number-text">
                            {index + 1}
                          </p>
                        )}
                      </div>

                      <div className="basic-page__track-title album__track-title">
                        <p className="basic-page__track-title-text album__track-title-text">
                          {item.name}
                        </p>
                      </div>
                      <div className="basic-page__track-duration album__track-duration">
                        <p className="basic-page__track-duration-text album__track-duration-text">
                          {getTimeMinSec(Number(item.duration_ms))}
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

export default Album;
