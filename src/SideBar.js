import React from "react";
import { NavLink } from "react-router-dom";
function SideBar(props) {
  return (
      <nav id="sidebar">
        <ul className="list-unstyled components text-secondary">
          <li>
            <NavLink to="/employees">
              <i className="fas fa-home"></i> Employees
            </NavLink>
          </li>
          <li>
            <NavLink to="/conferences">
              <i className="fas fa-file-alt"></i> Conferences
            </NavLink>
          </li>
        </ul>
      </nav>
  );
}

export default SideBar;
