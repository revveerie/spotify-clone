import React from "react";
import { NavLink } from "react-router-dom";

import Icon from "../Icon.jsx";

const SidebarItem = ({ image, imageActive, path }) => {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "current navigation__link" : "inactive navigation__link"
        }
        to={path}
      >
        <Icon image={image} imageActive={imageActive} />
      </NavLink>
    </>
  );
};

export default SidebarItem;
