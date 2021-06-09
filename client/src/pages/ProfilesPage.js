import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { ProfilesList } from "../components/ProfilesList";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../States/Context/AuthContext";
import { HttpContext } from "../States/Context/HttpContext";
import { LocationPathName, userIdFromURL } from "../Utils/Utils";

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


  const fetchProfiles = () => {
    if (userIdFromURL()) {
      request(`/api/profile/${userIdFromURL()}`, "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      })
        .then(setProfiles)
        .catch(message);
    } else {
      request("/api/profile", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      })
        .then(setProfiles)
        .catch(message);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [LocationPathName()]);

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
