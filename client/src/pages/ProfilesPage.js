import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { ProfilesList } from "../components/ProfilesList";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../States/Context/AuthContext";
import { HttpContext } from "../States/Context/HttpContext";
import { userIdFromURLLL } from "../Utils/Utils";

export const ProfilesPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useContext(HttpContext);
  const [profiles, setProfiles] = useState([]);

  //error handler
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  // const isAdminLookingForProfile = window.location.href.match("/profiles/"); //check if Admin from AdminPage looking for profile of selected user
  // const userIdFromURL = () => {
  //   if (isAdminLookingForProfile) {
  //     const indexOfIdInURL =
  //       window.location.href.match("/profiles/")["index"] + 10;
  //     const idFromURL = window.location.href.slice(indexOfIdInURL);
  //     return idFromURL; //get id of selected user by Admin
  //   }
  //   return 0;
  // };

  const fetchProfiles = () => {
    if (userIdFromURLLL) {
      request(`/api/profile/get/${userIdFromURLLL()}`, "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      })
        .then(setProfiles)
        .catch(message);
    } else {
      request("/api/profile/curr", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      })
        .then(setProfiles)
        .catch(message);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // const fetchProfiles = useCallback(async () => {
  //   try {
  //     if (isAdminLookingForProfile) {
  //       // const urlId = window.location.href.match("/profiles/")["index"] + 10;
  //       // const urlParam = window.location.href.slice(urlId); // check if admin is looking for smbds profiles

  //       const profilesDataAdmin = await request(
  //         `/api/profile/get/${userIdFromURL}`,
  //         "GET",
  //         null,
  //         {
  //           Authorization: `Bearer ${auth.token}`,
  //         }
  //       );
  //       setProfiles(profilesDataAdmin);
  //     } else {
  //       const profilesData = await request("/api/profile/curr", "GET", null, {
  //         Authorization: `Bearer ${auth.token}`,
  //       });
  //       setProfiles(profilesData);
  //     }
  //   } catch (e) {}
  // }, [auth.token, request]);

  // useEffect(() => {
  //   fetchProfiles();
  // }, [fetchProfiles]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Profiles page</h1>
      {!loading && (
        <ProfilesList profiles={profiles} setProfiles={setProfiles} />
      )}
    </div>
  );
};
