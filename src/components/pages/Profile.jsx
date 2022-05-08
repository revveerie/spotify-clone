import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ArtistCard from "../ArtistCard.jsx";
import AudioWave from "../AudioWave.jsx";
import Icon from "../Icon.jsx";
import PlaylistCard from "../PlaylistCard.jsx";
import ShowMore from "../ShowMore.jsx"

import NoAlbum from "../../assets/images/no-album-image.jpg";
import TickNotSaved from "../../assets/icons/tick-lg.png";
import TickSaved from "../../assets/icons/tick-gr.png";

const Profile = ({ dropdown }) => {
  const [topArtists, setTopArtists] = useState("");
  const [topTracks, setTopTracks] = useState("");
  const [current, setCurrent] = useState(null);
  const [saveTrack, setSaveTrack] = useState(false);
  const [removeTrack, setRemoveTrack] = useState(false);
  const [isSaved, setIsSaved] = useState("");
  const [currentSaved, setCurrentSaved] = useState(null);
  const [recent, setRecent] = useState("");
  const [playlist, setPlaylist] = useState("");
  const [artist, setArtist] = useState("");
  const [moreTopArtists, setMoreTopArtists] = useState(false);
  const [moreTopTracks, setMoreTopTracks] = useState(false);

  let savedBackground = true;

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/me/top/artists?limit=10`, {
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

    axios(`https://api.spotify.com/v1/me/top/tracks?limit=10`, {
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

    axios(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((recentResponse) => {
        setRecent(recentResponse.data);
      })
      .catch((error) => console.log(error));

    axios(`	https://api.spotify.com/v1/me/playlists?limit=6`, {
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

    axios(`https://api.spotify.com/v1/me/following?type=artist&limit=6`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((artistResponse) => {
        console.log(artistResponse.data.artists);
        setArtist(artistResponse.data.artists);
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

  return (
    <>
      <div className={dropdown ? "profile-page page hidden" : "profile-page page"}>
        <div className="profile-page__top-artists-wrapper">
          <div className="artist-page__header">
            <div className="artist-page__title">
              <p className="artist-page__title-text-top">Top artists</p>
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
                  index < 6 ? (
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
                  index >= 6 ? (
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
          <div className="artist-page__header">
            <div className="artist-page__title">
              <p className="artist-page__title-text-top">Top tracks</p>
            </div>
            <div className="show-more__button" onClick={onMoreTopTracks}>
              <div className="show-more__button-link">{moreTopTracks ? "Show less" : "Show more"}</div>
            </div>
          </div>
          <div className="basic-page__tracks">
            {topTracks
              ? topTracks.map((item, index) =>
                  index < 5 ? (
                    <div
                      className={
                        current === item
                          ? "basic-page__track playlist__track active"
                          : "basic-page__track playlist__track"
                      }
                      key={index}
                      onMouseLeave={() => handleOutSaved()}
                      onMouseEnter={() => handleClickSaved(item, item.id)}
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
                            to={`/artist/${getItem(item.album.artists, "id")}`}
                          >
                            {getItem(item.album.artists, "name")}
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
                  ) : (
                    (savedBackground = false)
                  )
                )
              : null}
            {moreTopTracks ? (
              topTracks
              ? topTracks.map((item, index) =>
                  index >= 5 ? (
                    <div
                      className={
                        current === item
                          ? "basic-page__track playlist__track active"
                          : "basic-page__track playlist__track"
                      }
                      key={index}
                      onMouseLeave={() => handleOutSaved()}
                      onMouseEnter={() => handleClickSaved(item, item.id)}
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
                            to={`/artist/${getItem(item.album.artists, "id")}`}
                          >
                            {getItem(item.album.artists, "name")}
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
                  ) : (
                    (savedBackground = false)
                  )
                )
              : null
            ): (
              <></>
            )}
          </div>
        </div>
        <div className="profile-page__playlists-wrapper">
          <div className="artist-page__header">
            <div className="artist-page__title">
              <p className="artist-page__title-text-top">Playlists</p>
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
          <div className="artist-page__header">
            <div className="artist-page__title">
              <p className="artist-page__title-text-top">Artists</p>
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
