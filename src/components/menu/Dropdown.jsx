import React from "react";

import DropdownSubmenuItem from "./DropdownSubmenuItem.jsx";

import Artist from "../../assets/icons/avatar-lg.png";
import ArtistActive from "../../assets/icons/avatar-gr.png";
import Album from "../../assets/icons/music-album-lg.png";
import AlbumActive from "../../assets/icons/music-album-gr.png";
import Song from "../../assets/icons/musical-note-lg.png";
import SongActive from "../../assets/icons/musical-note-gr.png";
import Playlist from "../../assets/icons/list-lg.png";
import PlaylistActive from "../../assets/icons/list-gr.png";

const Dropdown = ({ logout }) => {
  return (
    <>
      <div className="dropdown">
        <div className="dropdown__submenu">
          <DropdownSubmenuItem
            path="/artists"
            name="Artists"
            image={Artist}
            imageActive={ArtistActive}
          />
          <DropdownSubmenuItem
            path="/albums"
            name="Albums"
            image={Album}
            imageActive={AlbumActive}
          />
          <DropdownSubmenuItem 
            path="/songs" 
            name="Songs" 
            image={Song} 
            imageActive={SongActive} 
          />
          <DropdownSubmenuItem
            path="/playlists"
            name="Playlists"
            image={Playlist}
            imageActive={PlaylistActive}
          />
        </div>
      </div>
    </>
  );
};

export default Dropdown;
