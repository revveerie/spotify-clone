import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";

import Icon from "../Icon.jsx";
import ArtistCard from "../cards/ArtistCard.jsx";
import AlbumCard from "../cards/AlbumCard.jsx";
import PlaylistCard from "../cards/PlaylistCard.jsx";
import AudioWave from "../AudioWave.jsx";
import Player from "../Player.jsx";

import getItem from "../../helpers/getItem.js";
import getInfo from "../../helpers/getInfo.js";

import Cross from "../../assets/icons/cancel.png";
import CrossActive from "../../assets/icons/cancel-gr.png";
import NoFollow from "../../assets/icons/avatar-dg.png";
import TickNotSaved from "../../assets/icons/tick-lg.png";
import TickSaved from "../../assets/icons/tick-gr.png";
import NoPhoto from "../../assets/icons/avatar.png";

const Browse = ({ dropdown }) => {
  const [browseArtist, setBrowseArtist] = useState("");
  const [browseAlbum, setBrowseAlbum] = useState("");
  const [browseTrack, setBrowseTrack] = useState("");
  const [browsePlaylist, setBrowsePlaylist] = useState("");
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(false);
  const [allArtists, setAllArtists] = useState(false);
  const [allAlbums, setAllAlbums] = useState(false);
  const [allTracks, setAllTracks] = useState(false);
  const [allPlaylists, setAllPlaylists] = useState(false);
  const [current, setCurrent] = useState(null);
  const [isSaved, setIsSaved] = useState("");
  const [currentSaved, setCurrentSaved] = useState(null);
  const [saveTrack, setSaveTrack] = useState(false);
  const [removeTrack, setRemoveTrack] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();

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
        `https://api.spotify.com/v1/search?q=${query}&type=artist%2Ctrack%2Calbum%2Cplaylist&limit=50`,
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
    setAllArtists(false);
    setAllAlbums(false);
    setAllTracks(false);
    setAllPlaylists(false);
  };

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const showArtists = () => {
    setAllArtists(true);
  };

  const showAlbums = () => {
    setAllAlbums(true);
  };

  const showTracks = () => {
    setAllTracks(true);
  };

  const showPlaylists = () => {
    setAllPlaylists(true);
  };

  const hideSearch = () => {
    setAllArtists(false);
    setAllAlbums(false);
    setAllTracks(false);
    setAllPlaylists(false);
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

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  return (
    <>
      <div className={dropdown ? "player-hidden" : "player"}>
        <Player trackUri={playingTrack?.uri} />
      </div>
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
        {search && value != "" && !allArtists && !allAlbums && !allTracks && !allPlaylists && (
          <div className="browse__result">
            <div className="browse__artists">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">Artists</p>
                </div>
                <div className="show-more__button" onClick={showArtists}>
                  <div className="show-more__button-link">Show more</div>
                </div>
              </div>
              {browseArtist?.items
                ? browseArtist.items.map((item, index) =>
                    index < 3 ? (
                      <Link
                        className="browse__artist-item"
                        key={index}
                        to={`/artist/${item.id}`}
                        onClick={topFunction}
                      >
                        {getItem(item.images, "url") ? (
                          <div
                            className={
                              index == 0
                                ? "browse__artist-image browse__artist-image_main"
                                : "browse__artist-image"
                            }
                          >
                            <img src={getItem(item.images, "url")} alt="" />
                          </div>
                        ) : (
                          <div className="artist__no-photo">
                            <img src={NoPhoto} className="artist__no-photo-image" />
                          </div>
                        )}

                        <div className="browse__artist-name">
                          <p className="browse__artist-name-text">{item.name}</p>
                        </div>
                      </Link>
                    ) : null
                  )
                : null}
            </div>
            <div className="browse__albums">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">Albums</p>
                </div>
                <div className="show-more__button" onClick={showAlbums}>
                  <div className="show-more__button-link">Show more</div>
                </div>
              </div>
              <div className="browse__albums-wrapper">
                {browseAlbum?.items
                  ? browseAlbum.items.map((item, index) =>
                      index < 3 ? (
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
                        </Link>
                      ) : null
                    )
                  : null}
              </div>
            </div>
            <div className="browse__tracks">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">Tracks</p>
                </div>
                <div className="show-more__button" onClick={showTracks}>
                  <div className="show-more__button-link">Show more</div>
                </div>
              </div>
              {browseTrack?.items
                ? browseTrack.items.map((item, index) =>
                    index < 3 ? (
                      <div className="basic-page__track artist-page__track" key={index} onClick={() => chooseTrack(item)}>
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
                    ) : null
                  )
                : null}
            </div>
            <div className="browse__playlists">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">PLaylists</p>
                </div>
                <div className="show-more__button" onClick={showPlaylists}>
                  <div className="show-more__button-link">Show more</div>
                </div>
              </div>
              {browsePlaylist?.items
                ? browsePlaylist.items.map((item, index) =>
                    index < 3 ? (
                      <Link
                        to={`/playlist/${item.id}`}
                        className="basic-page__track artist-page__track"
                        key={index}
                      >
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
                    ) : null
                  )
                : null}
            </div>
          </div>
        )}
        <div className="browse__all-result">
          {search && value != "" && allArtists && (
            <div className="browse__artists">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">Artists</p>
                </div>
                <div className="show-more__button" onClick={hideSearch}>
                  <div className="show-more__button-link">Go back</div>
                </div>
              </div>
              <div className="artists__wrapper">
                {browseArtist?.items
                  ? browseArtist.items.map((item, index) => (
                      <div className="grid-item" key={index}>
                        <ArtistCard
                          index={index}
                          image={getItem(item.images, "url")}
                          name={item.name}
                          artist={item.name}
                          type={item.type}
                          id={item.id}
                          key={index}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          )}
          {search && value != "" && allAlbums && (
            <div className="browse__albums">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">Albums</p>
                </div>
                <div className="show-more__button" onClick={hideSearch}>
                  <div className="show-more__button-link">Go back</div>
                </div>
              </div>
              <div className="browse__albums-wrapper">
                <div className="albums__wrapper">
                  {browseAlbum?.items
                    ? browseAlbum.items.map((item, index) => (
                        <div className="grid-item" key={index}>
                          <AlbumCard
                            index={index}
                            image={getItem(item.images, "url")}
                            name={item.name}
                            artist={getItem(item.artists, "name")}
                            pathArtist={`/artist/${getItem(item.artists, "id")}`}
                            albumId={item.id}
                          />
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          )}
          {search && value != "" && allTracks && (
            <div className="browse__tracks">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">Tracks</p>
                </div>
                <div className="show-more__button" onClick={hideSearch}>
                  <div className="show-more__button-link">Go back</div>
                </div>
              </div>
              {browseTrack?.items
                ? browseTrack.items.map((item, index) => (
                    <div
                      className={
                        current === item
                          ? "basic-page__track playlist__track active"
                          : "basic-page__track playlist__track"
                      }
                      key={index}
                      onMouseLeave={() => handleOutSaved()}
                      onMouseEnter={() => handleClickSaved(item, item.id)}
                      onClick={() => chooseTrack(item)}
                    >
                      <div className="basic-page__track-number playlist__track-number">
                        {current === item ? (
                          <AudioWave />
                        ) : (
                          <p className="basic-page__track-number-text">{index + 1}</p>
                        )}
                      </div>
                      <div className="basic-page__track-image playlist__track-image">
                        {getItem(item.album.images, "url") ? (
                          <img src={getItem(item.album.images, "url")} alt="" />
                        ) : (
                          <img src={NoAlbum} alt="" />
                        )}
                      </div>
                      <div
                        className="basic-page__track-title playlist__track-title"
                        onClick={() => handleClick(item)}
                      >
                        <p className="basic-page__track-title-text">{item.name}</p>
                        <div className="playlist__row">
                          <Link
                            className="playlist__track-title-artist"
                            to={`/artist/${getItem(item.artists, "id")}`}
                          >
                            {getItem(item.artists, "name")}
                          </Link>
                          <Link
                            className="playlist__track-title-artist playlist__track-title-album"
                            to={`/album/${getInfo(item.album, "id")}`}
                          >
                            {getInfo(item.album, "name")}
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
                          {getTimeMinSec(Number(item.duration_ms))}
                        </p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          )}
          {search && value != "" && allPlaylists && (
            <div className="browse__playlists">
              <div className="artist-page__header">
                <div className="artist-page__title">
                  <p className="artist-page__title-text-top">PLaylists</p>
                </div>
                <div className="show-more__button" onClick={hideSearch}>
                  <div className="show-more__button-link">Go back</div>
                </div>
              </div>
              <div className="playlists__wrapper">
                {browsePlaylist?.items
                  ? browsePlaylist.items.map((item, index) => (
                      <div className="grid-item" key={index}>
                        <PlaylistCard
                          index={index}
                          name={item.name}
                          image={getItem(item.images, "url")}
                          creator={item.owner.display_name}
                          id={item.id}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Browse;
