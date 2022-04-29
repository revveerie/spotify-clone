import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Icon from "../Icon.jsx";
import AlbumPlayer from "../AlbumPlayer.jsx";

import Shuffle from "../../assets/icons/shuffle-lg.png";
import ShuffleHover from "../../assets/icons/shuffle-gr.png";
import Pause from "../../assets/icons/pause-lg.png";
import PauseHover from "../../assets/icons/pause-gr.png";
import Save from "../../assets/icons/tick-gr.png";

const Album = ({ dropdown }) => {
  const [album, setAlbum] = useState("");
  const [albumTracks, setAlbumTracks] = useState("");
  const [shuffle, setShuffle] = useState(true);
  const [save, setSave] = useState(false);
  const [current, setCurrent] = useState(null);
  const [showPlay, setShowPlay] = useState(false);
  const { albumId } = useParams();

  const ALBUM_ENDPOINT = `https://api.spotify.com/v1/albums/${albumId}`;
  const ALBUM_TRACKS_ENDPOINT = `https://api.spotify.com/v1/albums/${albumId}/tracks`;

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

    axios(ALBUM_TRACKS_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((albumTracksResponse) => {
        setAlbumTracks(albumTracksResponse.data);
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

  const onShuffle = () => {
    shuffle == false ? setShuffle(true) : setShuffle(false);
  };

  const onSave = () => {
    save == false ? setSave(true) : setSave(false);
  };

  const handleClick = (e) => {
    setCurrent(e);
  };

  const onMouseEnter = () => {
    setShowPlay(true);
  };

  const onMouseLeave = () => {
    setShowPlay(false);
  };

  return (
    <>
      <div className={dropdown ? "album page hidden" : "album page"}>
        <div className="album__top">
          <img src={getItem(album.images, "url")} />
        </div>
        <div className="album__content">
          <div className="container">
            <div className="album__info">
              <div className="album__info-image">
                <img src={getItem(album.images, "url")} />
              </div>
              <div className="album__info-content info-content">
                <div className="info-content__type">
                  <p className="info-content__type-text">{album.type}</p>
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
                      albumTracks?.items
                        ? albumTracks.items.reduce(
                            (totalDuration, albumTrack) => totalDuration + albumTrack.duration_ms,
                            0
                          )
                        : null
                    )}{" "}
                  </p>
                </div>
                <div className="info-content__buttons">
                  <div
                    className="info-content__button info-content__button_play"
                    onClick={onShuffle}
                  >
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
            <div className="album__tracks">
              {albumTracks?.items
                ? albumTracks.items.map((item, index) => (
                    <div
                      className={current === item ? "album__track active" : "album__track"}
                      key={index}
                      onClick={() => handleClick(item)}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                    >
                      {current === item ? (
                        <div className="album__track-number">
                          <div className="album__track-number-icon">
                            <Icon image={Pause} imageActive={PauseHover}></Icon>
                          </div>
                        </div>
                      ) : (
                        <div className="album__track-number">
                          <p className="album__track-number-text">{index + 1}</p>
                        </div>
                      )}

                      <div className="album__track-title">
                        <p className="album__track-title-text">{item.name}</p>
                      </div>
                      <div className="album__track-duration">
                        <p className="album__track-duration-text">
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
