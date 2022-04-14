import React from "react";

import { NavLink } from "react-router-dom";

const DropdownMenuItem = ({ path, name }) => {
  return (
    <>
      <div className="dropdown__menu-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "current dropdown__link_lvl-1" : "inactive dropdown__link_lvl-1"
          }
          to={path}
        >
          {name}
        </NavLink>
      </div>
    </>
  );
};

export default DropdownMenuItem;
