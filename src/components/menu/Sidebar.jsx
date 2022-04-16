import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import ProfileIcon from "../ProfileIcon.jsx";
import SidebarItem from "./SidebarItem.jsx";
import Dropdown from "./Dropdown.jsx";
import Icon from "../Icon.jsx";

import SearchImg from "../../assets/icons/search-dg.png";
import SearchImgActive from "../../assets/icons/search-lg.png";
import ExploreImg from "../../assets/icons/direction-dg.png";
import ExploreImgActive from "../../assets/icons/direction-lg.png";
import MyMusicImg from "../../assets/icons/music-dg.png";
import MyMusicImgActive from "../../assets/icons/music-lg.png";
import Plus from "../../assets/icons/plus-lg.png";
import PlusActive from "../../assets/icons/plus-gr.png";

const Sidebar = ({ profile, logout, onMouseEnter, onMouseLeave, dropdown }) => {
  // const [dropdown, setDropdown] = useState(false);

  const getPhoto = () => {
    for (let key in profile) {
      for (let innerKey in profile[key]) {
        return profile[key]["url"];
      }
    }
  };

  return (
    <>
      <div className="sidebar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="sidebar__profile profile">
          <NavLink to="/profile">
            <ProfileIcon profile={getPhoto()} />
          </NavLink>
        </div>
        <nav className="sidebar__navigation navigation">
          <SidebarItem
            path="/"
            image={ExploreImg}
            imageActive={ExploreImgActive}
            dropdown={dropdown}
            name="Explore"
          />
          <SidebarItem
            path="/browse"
            image={SearchImg}
            imageActive={SearchImgActive}
            dropdown={dropdown}
            name="Search"
          />
          <SidebarItem
            path="/my-music"
            image={MyMusicImg}
            imageActive={MyMusicImgActive}
            dropdown={dropdown}
            name="My music"
          />
        </nav>
        {dropdown && (
          <div className="sidebar__add-playlist">
            <NavLink to="/new-playlist" className="sidebar__add-playlist-button">
              <div className="sidebar__add-playlist-button-icon">
                <Icon image={Plus} imageActive={PlusActive} />
              </div>
              <div className="dropdown__button dropdown__menu-item dropdown__link_lvl-1">
                New playlist
              </div>
            </NavLink>
          </div>
        )}

        {dropdown && <Dropdown logout={logout} />}
      </div>
    </>
  );
};

export default Sidebar;
