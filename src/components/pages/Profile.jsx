import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ArtistCard from "../cards/ArtistCard.jsx";
import PlaylistCard from "../cards/PlaylistCard.jsx";
import Icon from "../Icon.jsx";
import AudioWave from "../AudioWave.jsx";
import ShowMore from "../ShowMore.jsx";
import Player from "../Player.jsx";

import getItem from "../../helpers/getItem.js";
import getTimeMinSec from "../../helpers/getTimeMinSec.js";
import getInfo from "../../helpers/getInfo.js";

import NoAlbum from "../../assets/images/no-album-image.jpg";
import TickNotSaved from "../../assets/icons/tick-lg.png";
import TickSaved from "../../assets/icons/tick-gr.png";

const Profile = ({ dropdown }) => {
  const [topArtists, setTopArtists] = useState("");
  const [topTracks, setTopTracks] = useState("");
  const [moreTopArtists, setMoreTopArtists] = useState(false);
  const [moreTopTracks, setMoreTopTracks] = useState(false);
  const [playlist, setPlaylist] = useState("");
  const [artist, setArtist] = useState("");
  const [recent, setRecent] = useState("");
  const [current, setCurrent] = useState(null);
  const [saveTrack, setSaveTrack] = useState(false);
  const [removeTrack, setRemoveTrack] = useState(false);
  const [isSaved, setIsSaved] = useState("");
  const [currentSaved, setCurrentSaved] = useState(null);
  const [itemsForShow, setItemsForShow] = useState("");
  const [playingTrack, setPlayingTrack] = useState();

  const TOP_ARTISTS = "https://api.spotify.com/v1/me/top/artists?limit=10";
  const TOP_TRACKS = "https://api.spotify.com/v1/me/top/tracks?limit=10";
  const RECENTLY_PLAYED = "https://api.spotify.com/v1/me/player/recently-played?limit=5";
  const USER_PLAYLISTS = "https://api.spotify.com/v1/me/playlists?limit=6";
  const USER_ARTISTS = "https://api.spotify.com/v1/me/following?type=artist&limit=6";

  let savedBackground = true;

  useEffect(() => {
    if (window.innerWidth > 1440) {
      setItemsForShow(6);
    } else if (window.innerWidth > 1200 && window.innerWidth <= 1440) {
      setItemsForShow(5);
    } else if (window.innerWidth > 1024 && window.innerWidth <= 1200) {
      setItemsForShow(4);
    } else if (window.innerWidth > 991 && window.innerWidth <= 1024) {
      setItemsForShow(5);
    } else if (window.innerWidth > 768 && window.innerWidth <= 991) {
      setItemsForShow(4);
    } else if (window.innerWidth > 650 && window.innerWidth <= 768) {
      setItemsForShow(3);
    } else if (window.innerWidth <= 650) {
      setItemsForShow(2);
    }

    let token = localStorage.getItem("token");

    axios(TOP_ARTISTS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((topArtistsResponse) => {
        setTopArtists(topArtistsResponse.data);
      })
      .catch((error) => console.log(error));

    axios(TOP_TRACKS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((topTracksResponse) => {
        setTopTracks(topTracksResponse.data.items);
      })
      .catch((error) => console.log(error));

    axios(RECENTLY_PLAYED, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((recentResponse) => {
        setRecent(recentResponse.data.items);
      })
      .catch((error) => console.log(error));

    axios(USER_PLAYLISTS, {
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

    axios(USER_ARTISTS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((artistResponse) => {
        setArtist(artistResponse.data.artists);
      })
      .catch((error) => console.log(error));
  }, []);

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

  const onMoreTopArtists = () => {
    moreTopArtists == false ? setMoreTopArtists(true) : setMoreTopArtists(false);
  };

  const onMoreTopTracks = () => {
    moreTopTracks == false ? setMoreTopTracks(true) : setMoreTopTracks(false);
  };

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1440) {
      setItemsForShow(6);
    } else if (window.innerWidth > 1200 && window.innerWidth <= 1440) {
      setItemsForShow(5);
    } else if (window.innerWidth > 1024 && window.innerWidth <= 1200) {
      setItemsForShow(4);
    } else if (window.innerWidth > 991 && window.innerWidth <= 1024) {
      setItemsForShow(5);
    } else if (window.innerWidth > 768 && window.innerWidth <= 991) {
      setItemsForShow(4);
    } else if (window.innerWidth > 650 && window.innerWidth <= 768) {
      setItemsForShow(3);
    } else if (window.innerWidth <= 650) {
      setItemsForShow(2);
    }
  });

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  return (
    <>
      <div className={dropdown ? "player-hidden" : "player"}>
        <Player trackUri={playingTrack?.uri} />
      </div>
      <div className={dropdown ? "profile-page page hidden" : "profile-page page"}>
        <div className="profile-page__top-artists-wrapper">
          <div className="profile-page__header">
            <div className="profile-page__title">
              <p className="profile-page__title-text-top">Top artists</p>
            </div>
            <div className="show-more__button" onClick={onMoreTopArtists}>
              <div className="show-more__button-link">
                {moreTopArtists ? "Show less" : "Show more"}
              </div>
            </div>
          </div>
          <div className="profile-page__top-artists-grid">
            {topArtists?.items
              ? topArtists.items.map((item, index) =>
                  index < itemsForShow ? (
                    <div className={moreTopArtists ? "grid-item show" : "grid-item"} key={index}>
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
                  ) : (
                    (savedBackground = false)
                  )
                )
              : null}
            {moreTopArtists ? (
              topArtists?.items ? (
                topArtists.items.map((item, index) =>
                  index >= itemsForShow ? (
                    <div className={moreTopArtists ? "grid-item show" : "grid-item"} key={index}>
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
                  ) : (
                    (savedBackground = false)
                  )
                )
              ) : null
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="profile-page__tracks-wrapper">
          <div className="profile-page__header">
            <div className="profile-page__title">
              <p className="profile-page__title-text-top">Top tracks</p>
            </div>
            <div className="show-more__button" onClick={onMoreTopTracks}>
              <div className="show-more__button-link">
                {moreTopTracks ? "Show less" : "Show more"}
              </div>
            </div>
          </div>
          <div className="basic-page__tracks">
            {topTracks
              ? topTracks.map((item, index) =>
                  index < 5 ? (
                    <div
                      className={
                        current === item ? "basic-page__track active" : "basic-page__track"
                      }
                      key={index}
                      onMouseLeave={() => handleOutSaved()}
                      onMouseEnter={() => handleClickSaved(item, item.id)}
                      onClick={() => chooseTrack(item)}
                    >
                      <div className="basic-page__track-number">
                        {current === item ? (
                          <AudioWave />
                        ) : (
                          <p className="basic-page__track-number-text">{index + 1}</p>
                        )}
                      </div>
                      <div className="basic-page__track-image">
                        {getItem(item.album.images, "url") ? (
                          <img src={getItem(item.album.images, "url")} alt="" />
                        ) : (
                          <img src={NoAlbum} alt="" />
                        )}
                      </div>
                      <div
                        className="basic-page__track-title profile-page__track-title"
                        onClick={() => handleClick(item)}
                      >
                        <p className="basic-page__track-title-text">{item.name}</p>
                        <div className="basic-page__row">
                          <Link
                            className="basic-page__track-title-artist"
                            to={`/artist/${getItem(item.album.artists, "id")}`}
                          >
                            {getItem(item.album.artists, "name")}
                          </Link>
                          <Link
                            className="basic-page__track-title-artist basic-page__track-title-album"
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
                      <div className="basic-page__track-duration">
                        <p className="basic-page__track-duration-text">
                          {getTimeMinSec(Number(item.duration_ms))}
                        </p>
                      </div>
                    </div>
                  ) : (
                    (savedBackground = false)
                  )
                )
              : null}
            {moreTopTracks ? (
              topTracks ? (
                topTracks.map((item, index) =>
                  index >= 5 ? (
                    <div
                      className={
                        current === item ? "basic-page__track active" : "basic-page__track"
                      }
                      key={index}
                      onMouseLeave={() => handleOutSaved()}
                      onMouseEnter={() => handleClickSaved(item, item.id)}
                      onClick={() => chooseTrack(item)}
                    >
                      <div className="basic-page__track-number">
                        {current === item ? (
                          <AudioWave />
                        ) : (
                          <p className="basic-page__track-number-text">{index + 1}</p>
                        )}
                      </div>
                      <div className="basic-page__track-image">
                        {getItem(item.album.images, "url") ? (
                          <img src={getItem(item.album.images, "url")} alt="" />
                        ) : (
                          <img src={NoAlbum} alt="" />
                        )}
                      </div>
                      <div
                        className="basic-page__track-title profile-page__track-title"
                        onClick={() => handleClick(item)}
                      >
                        <p className="basic-page__track-title-text">{item.name}</p>
                        <div className="basic-page__row">
                          <Link
                            className="basic-page__track-title-artist"
                            to={`/artist/${getItem(item.album.artists, "id")}`}
                          >
                            {getItem(item.album.artists, "name")}
                          </Link>
                          <Link
                            className="basic-page__track-title-artist basic-page__track-title-album"
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
                      <div className="basic-page__track-duration">
                        <p className="basic-page__track-duration-text">
                          {getTimeMinSec(Number(item.duration_ms))}
                        </p>
                      </div>
                    </div>
                  ) : (
                    (savedBackground = false)
                  
                  )
                )
              ) : null
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="profile-page__recent-wrapper">
          <div className="profile-page__header">
            <div className="profile-page__title">
              <p className="profile-page__title-text-top">Recently played</p>
            </div>
            <div className="show-more__button">
              <Link to="/recent-tracks" className="show-more__button-link">
                Show more
              </Link>
            </div>
          </div>
          <div className="basic-page__tracks">
            {recent
              ? recent.map((item, index) => (
                  <div
                    className={
                      current === item
                        ? "basic-page__track active"
                        : "basic-page__track"
                    }
                    key={index}
                    onMouseLeave={() => handleOutSaved()}
                    onMouseEnter={() => handleClickSaved(item, item.track.id)}
                    onClick={() => chooseTrack(item.track)}
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
                      className="basic-page__track-title profile-page__track-title"
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
        <div className="profile-page__playlists-wrapper">
          <div className="profile-page__header">
            <div className="profile-page__title">
              <p className="profile-page__title-text-top">Playlists</p>
            </div>
            <ShowMore path="/playlists" />
          </div>
          <div className="profile-page__playlists-grid">
            {playlist?.items
              ? playlist.items.map((item, index) => (
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
        <div className="profile-page__artists-wrapper">
          <div className="profile-page__header">
            <div className="profile-page__title">
              <p className="profile-page__title-text-top">Artists</p>
            </div>
            <ShowMore path="/artists" />
          </div>
          <div className="profile-page__artists-grid">
            {artist?.items
              ? artist.items.map((item, index) => (
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
      </div>
    </>
  );
};

export default Profile;
