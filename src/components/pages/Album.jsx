import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Album = ({ dropdown }) => {
  const [album, setAlbum] = useState("");
  const [albumTracks, setAlbumTracks] = useState("");
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

  return (
    <>
      <div className={dropdown ? "album page hidden" : "album page"}>
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
              <p className="info-content__row-text">{album.release_date}</p>
              <p className="info-content__row-text">{album.total_tracks} songs, </p>
              <p className="info-content__row-text">
                {albumTracks?.items
                  ? albumTracks.items.reduce(
                      (totalDuration, albumTrack) => totalDuration + albumTrack.duration_ms,
                      0
                    )
                  : null}{" "}
                min
              </p>
            </div>
          </div>
        </div>

        <div className="album__tracks">
          {albumTracks?.items
            ? albumTracks.items.map((item, index) => (
                <div className="album__track" key={index}>
                  <div className="album__track-number">
                    <p className="album__track-number-text">{item.track_number}</p>
                  </div>
                  <div className="album__track-title">
                    <p className="album__track-title-text">{item.name}</p>
                  </div>
                  <div className="album__track-duration">
                    <p className="album__track-duration-text">{item.duration_ms}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Album;
