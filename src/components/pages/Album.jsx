import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Icon from "../Icon.jsx";

import Play from "../../assets/icons/play-button-lg.png";
import PlayHover from "../../assets/icons/play-button-gr.png";
import Pause from "../../assets/icons/volume.png";
import Save from "../../assets/icons/tick-gr.png";

const Album = ({ dropdown }) => {
  const [album, setAlbum] = useState("");
  const [albumTracks, setAlbumTracks] = useState("");
  const [play, setPlay] = useState(true);
  const [save, setSave] = useState(false);
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

  const getTime = (time) => {
    let min = time / 1000 / 60;
    let r = min % 1;
    let sec = Math.floor(r * 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
    min = Math.floor(min);
    return `${min}:${sec}`;
  };

  const onPlay = () => {
    play == false ? setPlay(true) : setPlay(false);
  };

  const onSave = () => {
    save == false ? setSave(true) : setSave(false);
  };

  return (
    <>
      <div className={dropdown ? "album page hidden" : "album page"}>
        <div className="container">
          <div className="album__top">
            <img src={getItem(album.images, "url")} />
          </div>
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
                <p className="info-content__row-text">{getItem(album.artists, "name")}</p>
                <p className="info-content__row-text info-content__row-text_date">
                  {String(album.release_date).slice(0, 4)}
                </p>
                <p className="info-content__row-text">{album.total_tracks} songs,</p>
                <p className="info-content__row-text info-content__row-text_time">
                  {getTime(
                    albumTracks?.items
                      ? albumTracks.items.reduce(
                          (totalDuration, albumTrack) => totalDuration + albumTrack.duration_ms,
                          0
                        )
                      : null
                  )}{" "}
                  min
                </p>
              </div>
              <div className="info-content__buttons">
                <div
                  className="info-content__button info-content__button_play"
                  onClick={onPlay}
                  style={
                    play
                      ? { background: "transparent" }
                      : { background: "#2fc680", border: "1px solid #2fc680" }
                  }
                >
                  {play ? (
                    <>
                      <div className="info-content__button-icon">
                        <Icon image={Play} imageActive={PlayHover}></Icon>
                      </div>
                      <div className="info-content__button-text">Play</div>
                    </>
                  ) : (
                    <>
                      <div className="info-content__button-icon info-content__button-icon_m">
                        <Icon image={Pause} imageActive={Pause}></Icon>
                      </div>
                      <div className="info-content__button-text info-content__button-text_m">
                        Pause
                      </div>
                    </>
                  )}
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
                  <div className="album__track" key={index}>
                    <div className="album__track-number">
                      <p className="album__track-number-text">{index + 1}</p>
                    </div>
                    <div className="album__track-title">
                      <p className="album__track-title-text">{item.name}</p>
                    </div>
                    <div className="album__track-duration">
                      <p className="album__track-duration-text">
                        {getTime(Number(item.duration_ms))}
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Album;
