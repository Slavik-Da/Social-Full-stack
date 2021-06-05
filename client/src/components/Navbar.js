import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../States/Context/AuthContext";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="/" class="brand-logo">
          {auth.role == "ADMIN" ? "ITOP Admin" : "ITOP User"}
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          {auth.role === "ADMIN" && (
            <li>
              <NavLink to="/admin">To admin page</NavLink>
            </li>
          )}
          {auth.role === "ADMIN" && (
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
