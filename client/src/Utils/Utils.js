import { useContext } from "react";
import { AuthContext } from "../States/Context/AuthContext";

// export const isAdminLookingForProfile =()=> {
//    return window.location.href.match("/profiles/")
// }; //check if Admin from AdminPage looking for profile of selected user

// export const userIdFromURL = () => {
//   if (isAdminLookingForProfile) {
//     const indexOfIdInURL =
//       window.location.href.match("/profiles/")["index"] + 10;
//     const idFromURL = window.location.href.slice(indexOfIdInURL);
//     return idFromURL; //get id of selected user by Admin
//   }
//   return 0;
// };

export const userIdFromURL = () => {
  const isAdminLookingForProfile = window.location.href.match("/profiles/");

  if (isAdminLookingForProfile) {
    const indexOfIdInURL =
      window.location.href.match("/profiles/")["index"] + 10;
    const idFromURL = window.location.href.slice(indexOfIdInURL);
    return idFromURL; //get id of selected user by Admin
  } else {
    return 0;
  }
};

export const IsAdminRole = () => {
  const auth = useContext(AuthContext);
  return auth.role === "ADMIN"; //check if is admin role from AuthContext
};
