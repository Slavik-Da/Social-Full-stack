import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../States/Context/AuthContext";
import { IsAdminRole } from "../Utils/Utils";

const ITOP_ADMIN = "ITOP Admin";
const ITOP_USER = "ITOP User";

export const Navbar = () => {
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
  };
  return (
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="/" class="brand-logo">
          {IsAdminRole() ? ITOP_ADMIN : ITOP_USER}
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          {IsAdminRole() && (
            <li>
              <NavLink to="/admin">To admin page</NavLink>
            </li>
          )}
          {IsAdminRole() && (
            <li>
              <NavLink to="/dashboard">To dashboard page</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/">Create new profile</NavLink>
          </li>
          <li>
            <NavLink to="/profiles">To profiles page</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
