import React from "react";
import { NavLink } from "react-router-dom";

import ProfileIcon from "./ProfileIcon.jsx";
import SidebarItem from "./SidebarItem.jsx";

import HomeImg from "../assets/icons/home-dg.png";
import HomeImgActive from "../assets/icons/home-lg.png";
import BrowseImg from "../assets/icons/vynil-dg.png";
import BrowseImgActive from "../assets/icons/vynil-lg.png";
import MyMusicImg from "../assets/icons/music-dg.png";
import MyMusicImgActive from "../assets/icons/music-lg.png";

const Sidebar = ({ profile }) => {
  const getPhoto = () => {
    for (let key in profile) {
      for (let innerKey in profile[key]) {
        return profile[key]["url"];
      }
    }
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__profile profile">
          <NavLink to="/profile">
            <ProfileIcon profile={getPhoto()} />
          </NavLink>
        </div>
        <div className="sidebar__navigation-wrapper">
          <nav className="sidebar__navigation navigation">
            <SidebarItem path="/" image={HomeImg} imageActive={HomeImgActive} />
            <SidebarItem path="/browse" image={BrowseImg} imageActive={BrowseImgActive} />
            <SidebarItem path="/my-music" image={MyMusicImg} imageActive={MyMusicImgActive} />
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
