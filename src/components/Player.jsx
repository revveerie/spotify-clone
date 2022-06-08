import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ trackUri }) => {
  const [play, setPlay] = useState(false);

  let token = localStorage.getItem("token");
  
  useEffect(() => {
    setPlay(true);
  }, [trackUri]);
  
  return (
    <>
      <SpotifyPlayer
        token={token}
        uris={trackUri ? [trackUri] : []}
        callback={(state) => {
          if (state.isPlaying) setPlay(false);
        }}
        play={play}
      />
    </>
  );
};

export default Player;
