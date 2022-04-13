import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Homepage from "./Homepage.jsx";
import Browse from "./Browse.jsx";
import MyMusic from "./MyMusic.jsx";
import Profile from "./Profile.jsx";
import Login from "./Login.jsx";
import Sidebar from "./Sidebar.jsx";

const App = () => {
  const CLIENT_ID = "4d09e811e32a40f392771a0e479839d5";
  const REDIRECT_URI = "http://localhost:8888/";
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
        console.log(currentUserResponse.data);
        if(!cleanupFunction)
          setCurrentUser(currentUserResponse.data);
      })

      .catch((error) => console.log(error));
      
    setToken(token);

    return () => cleanupFunction = true;


  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
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
          />
            <Routes>
                <Route path='/' element={<Homepage logout={logout} />} />
                <Route path='/browse' element={<Browse />} />
                <Route path='/my-music' element={<MyMusic />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </>
        
      )}
    </>
  );
};

export default App;
