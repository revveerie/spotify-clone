import React from "react";
import { NavLink } from "react-router-dom";

import DropdownMenuItem from "./DropdownMenuItem.jsx";
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
        <div className="dropdown__button">
          <p className="dropdown__link_lvl-1" onClick={logout}>
            Log out
          </p>
        </div>
        <div className="dropdown__menu">
          <DropdownMenuItem path="/" name="Home" />
          <DropdownMenuItem path="/browse" name="Browse" />
          <DropdownMenuItem path="/my-music" name="My music" />
        </div>
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
          <DropdownSubmenuItem path="/songs" name="Songs" image={Song} imageActive={SongActive} />
          <DropdownSubmenuItem
            path="/playlists"
            name="Playlists"
            image={Playlist}
            imageActive={PlaylistActive}
          />
        </div>
        <div className="dropdown__button">
          <NavLink to="/new-playlist">
            <p className="dropdown__link_lvl-1">New playlist</p>
          </NavLink>
          
        </div>
      </div>
    </>
  );
};

export default Dropdown;
