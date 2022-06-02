import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Icon from "../Icon.jsx";
import ShowMore from "../ShowMore.jsx";

import Cross from "../../assets/icons/cancel.png";
import CrossActive from "../../assets/icons/cancel-gr.png";
import NoFollow from "../../assets/icons/avatar-dg.png";

const Browse = ({ dropdown }) => {
  const [browseArtist, setBrowseArtist] = useState("");
  const [browseAlbum, setBrowseAlbum] = useState("");
  const [browseTrack, setBrowseTrack] = useState("");
  const [browsePlaylist, setBrowsePlaylist] = useState("");
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(false);

  const SPACE_DELIMITER = "%20";

  useEffect(() => {}, []);

  const getInputValue = (event) => {
    let token = localStorage.getItem("token");
    setSearch(true);
    setValue(event.target.value);

    console.log(search);
    const value = event.target.value;
    const valueArray = value.split(" ");
    const query = valueArray.join(SPACE_DELIMITER);

    if (value != "") {
      axios(
        `https://api.spotify.com/v1/search?q=${query}&type=artist%2Ctrack%2Calbum%2Cplaylist&limit=3`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((browseResponse) => {
          console.log(browseResponse.data);
          setBrowseArtist(browseResponse.data.artists);
          setBrowseAlbum(browseResponse.data.albums);
          setBrowseTrack(browseResponse.data.tracks);
          setBrowsePlaylist(browseResponse.data.playlists);
        })

        .catch((error) => console.log(error));
    }
  };

  const resetInput = () => {
    setValue("");
  };
  const getInfo = (item, keyword) => {
    for (let key in item) {
      if (key == keyword) return item[key];
    }
  };

  const getItem = (item, keyword) => {
    for (let key in item) {
      for (let innerKey in item[key]) {
        return item[key][keyword];
      }
    }
  };

  function topFunction() {
    document.body.scrollTop = 0; // Для Safari
    document.documentElement.scrollTop = 0; // Для Chrome, Firefox, IE и Opera
  }

  return (
    <>
      <div className={dropdown ? "browse page hidden" : "browse page"}>
        <div className="browse__wrapper">
          <div className="browse__clear-wrapper" onClick={resetInput}>
            <div className="browse__clear-button">
              <Icon image={Cross} imageActive={CrossActive} />
            </div>
          </div>
          <div className="browse__input-wrapper">
            <div className="browse__input">
              <input type="text" onChange={getInputValue} value={value} autoCorrect="off" />
            </div>
          </div>
        </div>
        {search && value != "" && (
          <div className="browse__result">
            <div className="browse__artists">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">Artists</p>
                </div>
                <ShowMore path="/browse-artists" />
              </div>
              {browseArtist?.items
                ? browseArtist.items.map((item, index) => (
                    <Link
                      className="browse__artist-item"
                      key={index}
                      to={`/artist/${item.id}`}
                      onClick={topFunction}
                    >
                      <div
                        className={
                          index == 0
                            ? "browse__artist-image browse__artist-image_main"
                            : "browse__artist-image"
                        }
                      >
                        {getItem(item.images, "url") ? (
                          <img src={getItem(item.images, "url")} alt="" />
                        ) : (
                          <img src={NoFollow} alt="" />
                        )}
                      </div>
                      <div className="browse__artist-name">
                        <p className="browse__artist-name-text">{item.name}</p>
                      </div>
                    </Link>
                  ))
                : null}
            </div>
            <div className="browse__albums">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">Albums</p>
                </div>
                <ShowMore path="/browse-albums" />
              </div>
              <div className="browse__albums-wrapper">
                {browseAlbum?.items
                  ? browseAlbum.items.map((item, index) => (
                      <Link
                        className="browse__album-item"
                        key={index}
                        to={`/album/${item.id}`}
                        onClick={topFunction}
                      >
                        <div
                          className={
                            index == 0
                              ? "browse__album-image_first"
                              : index == 1
                              ? "browse__album-image_second"
                              : "browse__album-image_third"
                          }
                        >
                          {getItem(item.images, "url") ? (
                            <img src={getItem(item.images, "url")} alt="" />
                          ) : (
                            <img src={NoFollow} alt="" />
                          )}
                        </div>
                        {index == 2 ? (
                          <div className="browse__artist-name browse__album-name">
                            <p className="browse__artist-name-text">{item.name}</p>
                            <p className="browse__release-date">{item.release_date}</p>
                          </div>
                        ) : null}
                      </Link>
                    ))
                  : null}
              </div>
            </div>
            <div className="browse__tracks">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">Tracks</p>
                </div>
                <ShowMore path="/browse-trackss" />
              </div>
              {browseTrack?.items
                ? browseTrack.items.map((item, index) => (
                    <div className="basic-page__track artist-page__track" key={index}>
                      <div className="basic-page__track-image artist-page__track-image">
                        {getItem(item.album.images, "url") ? (
                          <img src={getItem(item.album.images, "url")} alt="" />
                        ) : (
                          <img src={NoFollow} alt="" />
                        )}
                      </div>

                      <div className="basic-page__track-title artist-page__track-title">
                        <p className="basic-page__track-title-text artist-page__track-title-text">
                          {item.name}
                        </p>
                        <div className="artist-page__row">
                          <Link
                            className="artist-page__track-title-artist artist-page__track-title-album"
                            to={`/album/${getInfo(item.album, "id")}`}
                          >
                            {getInfo(item.album, "name")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="browse__playlists">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">PLaylists</p>
                </div>
                <ShowMore path="/browse-playlists" />
              </div>
              {browsePlaylist?.items
                ? browsePlaylist.items.map((item, index) => (
                    <Link to={`/playlist/${item.id}`} className="basic-page__track artist-page__track" key={index}>
                      <div className="basic-page__track-image artist-page__track-image">
                        {getItem(item.images, "url") ? (
                          <img src={getItem(item.images, "url")} alt="" />
                        ) : (
                          <img src={NoFollow} alt="" />
                        )}
                      </div>
                      <div className="basic-page__track-title artist-page__track-title">
                        <p className="basic-page__track-title-text artist-page__track-title-text">
                          {item.name}
                        </p>
                      </div>
                    </Link>
                  ))
                : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Browse;
