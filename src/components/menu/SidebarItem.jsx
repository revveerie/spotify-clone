import React from "react";
import { NavLink } from "react-router-dom";

import Icon from "../Icon.jsx";

const SidebarItem = ({ image, imageActive, path, dropdown, name }) => {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "current navigation__link" : "inactive navigation__link"
        }
        to={path}
      >
        <Icon image={image} imageActive={imageActive} />
        {dropdown && (
          <div className="dropdown__menu-item dropdown__link_lvl-1">
            {name}
          </div>
        )}
      </NavLink>
    </>
  );
};

export default SidebarItem;
