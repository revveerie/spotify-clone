import React from "react";

import { NavLink } from "react-router-dom";

import Icon from "../Icon.jsx";

const DropdownSubmenuItem = ({ path, name, image, imageActive }) => {
  return (
    <>
      <div className="dropdown__submenu-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "current dropdown__link_lvl-2" : "inactive dropdown__link_lvl-2"
          }
          to={path}
        >
          <div className="dropdown__link-icon">
            <Icon image={image} imageActive={imageActive} />
          </div>
          <div>{name}</div>
        </NavLink>
      </div>
    </>
  );
};

export default DropdownSubmenuItem;
