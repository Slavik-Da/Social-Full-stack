import { useContext } from "react";
import { AuthContext } from "../States/Context/AuthContext";
import { useLocation } from "react-router-dom";

export const userIdFromURL = () => {
  const isAdminLookingForProfile = window.location.href.match("/profiles/");
  if (isAdminLookingForProfile) {
    const indexOfIdInURL =
      window.location.href.match("/profiles/")["index"] + 10; // this is Kostyl, i know, but it works:)
    const idFromURL = window.location.href.slice(indexOfIdInURL);
    return idFromURL; //get id of selected user by Admin
  } else {
    return false;
  }
};

export const IsAdminRole = () => {
  const auth = useContext(AuthContext);
  return auth.role === "ADMIN"; //check if is admin role from AuthContext
};

export const LocationPathName = () => {
  const location = useLocation();
  return location.pathname;
};
