import React, { useContext, useEffect, useState } from "react";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../States/Context/AuthContext";
import { HttpContext } from "../States/Context/HttpContext";
import { userIdFromURL } from "../Utils/Utils";

export const ModalUserEdit = ({
  profileToEdit,
  profileIdtoEdit,
  setProfiles,
}) => {
  console.log(profileToEdit, profileIdtoEdit);
  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    fullYears: "",
    city: "",
  });
  const message = useMessage();
  const auth = useContext(AuthContext);

  const { request, error, clearError } = useContext(HttpContext);

  useEffect(() => {
    setProfile(profileToEdit);
    window.M.updateTextFields();
  }, [profileToEdit]);

  const changeHandler = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

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

  const refreshHandler = () => {
    request(
      `/api/profile/edit/${profileIdtoEdit}`,
      "PUT",
      { ...profile },
      {
        Authorization: `Bearer ${auth.token}`,
      }
    )
      .then(message)
      .catch(message)
      .finally(() => fetchProfiles());
  };

  const deleteHandler = () => {
    console.log(profileIdtoEdit);
    request(`/api/profile/delete/${profileIdtoEdit}`, "DELETE", null, {
      Authorization: `Bearer ${auth.token}`,
    })
      .then(message)
      .catch(message)
      .finally(() => fetchProfiles());
  };

  //error handler
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  return (
    <div>
      <div className="input-field">
        <input
          placeholder="Enter full name"
          id="profileName"
          type="text"
          name="name"
          value={profile.name}
          onChange={changeHandler}
        />
        <label htmlFor="profileName">Full name</label>
      </div>

      <div className="input-field">
        <p>Choose your gender</p>
        <p onChange={changeHandler}>
          <label>
            <input type="radio" name="gender" value="MAN" />
            <span>Man</span>
          </label>
          <br />
          <label>
            <input type="radio" name="gender" value="WOMAN" />
            <span>Woman</span>
          </label>
          <br />
          <label>
            <input type="radio" name="gender" value="OTHER" />
            <span>Other</span>
          </label>
        </p>
      </div>

      <div className="input-field">
        <input
          placeholder="How old are you?"
          id="fullYears"
          type="number"
          name="fullYears"
          value={profile.fullYears}
          onChange={changeHandler}
        />
        <label htmlFor="fullYears">years</label>
      </div>

      <div className="input-field">
        <input
          placeholder="Enter your city"
          id="city"
          type="text"
          name="city"
          value={profile.city}
          onChange={changeHandler}
        />
        <label htmlFor="city">city</label>
      </div>

      <div className="card-action">
        <button className="btn green darken-1" onClick={refreshHandler}>
          Refresh
        </button>
        <button className="btn red ligthten-3" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};
