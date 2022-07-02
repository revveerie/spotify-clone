import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import axios from "axios";

import Explore from "./pages/Explore.jsx";
import Browse from "./pages/Browse.jsx";
import Profile from "./pages/Profile.jsx";
import Artists from "./pages/Artists.jsx";
import Albums from "./pages/Albums.jsx";
import Album from "./pages/Album.jsx";
import Songs from "./pages/Songs.jsx";
import Playlists from "./pages/Playlists.jsx";
import RecentTracks from "./pages/RecentTracks.jsx";
import Playlist from "./pages/Playlist.jsx";
import NewPlaylist from "./pages/NewPlaylist.jsx";
import NewReleases from "./pages/NewReleases.jsx";
import Artist from "./pages/Artist.jsx";
import Categories from "./pages/Categories.jsx";
import Category from "./pages/Category.jsx";
import Featured from "./pages/Featured.jsx";
import Login from "./Login.jsx";
import Sidebar from "./menu/Sidebar.jsx";
import ProfileIcon from "./ProfileIcon.jsx";
import Icon from "./Icon.jsx";
import ArtistAlbums from "./pages/ArtistAlbums.jsx";

import ExitImg from "../assets/icons/exit-lg.png";
import ExitImgActive from "../assets/icons/exit-gr.png";

const App = () => {
  const CLIENT_ID = "4d09e811e32a40f392771a0e479839d5";
  const REDIRECT_URI = "https://revveerie-spotify-clone.netlify.app";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "ugc-image-upload",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-follow-modify",
    "user-follow-read",
    "user-read-recently-played",
    "user-read-playback-position",
    "user-top-read",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-read-private",
    "playlist-modify-private",
    "app-remote-control",
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-modify",
    "user-library-read",
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
  const CURRENT_USER_ENDPOINT = "https://api.spotify.com/v1/me";

  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  let cleanupFunction = false;

  const getToken = () => {
    let urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
    let token = urlParams.get("access_token");
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    getToken();

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    axios(CURRENT_USER_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((currentUserResponse) => {
        if (!cleanupFunction) setCurrentUser(currentUserResponse.data);
      })

      .catch((error) => console.log(error));

    setToken(token);

    checkWidth();

    window.addEventListener("resize", function () {
      checkWidth();
    });

    return () => (cleanupFunction = true);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const checkWidth = () => {
    window.innerWidth <= 1024 ? setShowProfile(true) : setShowProfile(false);
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 1024) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 1024) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const getPhoto = () => {
    for (let key in currentUser.images) {
      for (let innerKey in currentUser.images[key]) {
        return currentUser.images[key]["url"];
      }
    }
  };

  return (
    <>
      {!token ? (
        <Login
          CLIENT_ID={CLIENT_ID}
          REDIRECT_URI={REDIRECT_URI}
          AUTH_ENDPOINT={AUTH_ENDPOINT}
          RESPONSE_TYPE={RESPONSE_TYPE}
          SCOPES_URL_PARAM={SCOPES_URL_PARAM}
        />
      ) : (
        <>
          <Sidebar
            profile={currentUser.images}
            logout={logout}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            dropdown={dropdown}
          />
          {showProfile ? (
            <div className="page__top">
              <NavLink to="/profile">
                <ProfileIcon profile={getPhoto()} />
              </NavLink>
              <div className="page__top-logout" onClick={logout}>
                <Icon image={ExitImg} imageActive={ExitImgActive} />
              </div>
            </div>
          ) : (
            <></>
          )}
          <Routes>
            <Route path="/" element={<Explore dropdown={dropdown} />} />
            <Route path="/browse" element={<Browse dropdown={dropdown} />} />
            <Route path="/profile" element={<Profile dropdown={dropdown} />} />
            <Route path="/artists" element={<Artists dropdown={dropdown} />} />
            <Route path="/albums" element={<Albums dropdown={dropdown} />} />
            <Route path="/album/:id" element={<Album dropdown={dropdown} />} />
            <Route path="/songs" element={<Songs dropdown={dropdown} />} />
            <Route path="/playlists" element={<Playlists dropdown={dropdown} />} />
            <Route path="/playlist/:id" element={<Playlist dropdown={dropdown} />} />
            <Route path="/new-playlist" element={<NewPlaylist />} />
            <Route path="/new-releases" element={<NewReleases dropdown={dropdown} />} />
            <Route path="/artist/:id" element={<Artist dropdown={dropdown} />} />
            <Route path="/recent-tracks" element={<RecentTracks dropdown={dropdown} />} />
            <Route path="/categories" element={<Categories dropdown={dropdown} />} />
            <Route path="/featured" element={<Featured dropdown={dropdown} />} />
            <Route path="/category/:id" element={<Category dropdown={dropdown} />} />
            <Route path="/artist-albums/:id" element={<ArtistAlbums dropdown={dropdown} />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
