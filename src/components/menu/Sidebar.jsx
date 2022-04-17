import React, { useState, useEffect } from "react";
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
  const [showProfile, setShowProfile] = useState(false);

  const getPhoto = () => {
    for (let key in profile) {
      for (let innerKey in profile[key]) {
        return profile[key]["url"];
      }
    }
  };

  const checkWidth = () => {
    window.innerWidth > 1024 ? setShowProfile(true) : setShowProfile(false);
  };

  useEffect(() => {
    checkWidth();

    window.addEventListener("resize", function () {
      checkWidth();
    });
  }, []);

  return (
    <>
      <div className="sidebar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {showProfile ? (
          <div className="sidebar__profile profile">
            <NavLink to="/profile">
              <ProfileIcon profile={getPhoto()} />
            </NavLink>
            {dropdown && (
              <div className="dropdown__button dropdown__menu-item dropdown__button_logout">
                <p className="dropdown__link_lvl-1" onClick={logout}>
                  Log out
                </p>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
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
