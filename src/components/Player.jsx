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
        callback={state => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        styles={{
          activeColor: '#2fc680',
          bgColor: '#1e1e1e',
          color: '#fff',
          loaderColor: '#2fc680',
          sliderTrackColor: '#6e6e6e',
          sliderColor: '#2fc680',
          trackArtistColor: '#6e6e6e',
          trackNameColor: '#b2b2b2',
          sliderHandleColor: 'transparent'
        }}
      />
    </>
  );
};

export default Player;
