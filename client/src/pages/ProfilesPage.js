import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { ProfilesList } from "../components/ProfilesList";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../States/Context/AuthContext";
import { HttpContext } from "../States/Context/HttpContext";

export const ProfilesPage = ({userIdAmin}) => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useContext(HttpContext);
  const [profiles, setProfiles] = useState([]);

  //error handler
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const fetchProfiles = useCallback(async () => {
    try {
      const profilesData = await request("/api/profile/curr", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setProfiles(profilesData);
    } catch (e) {}
  }, [auth.token, request]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Profiles page</h1>
      {!loading && <ProfilesList profiles={profiles} />}
    </div>
  );
};
