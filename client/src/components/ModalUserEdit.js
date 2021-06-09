import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../States/Context/AuthContext";
import { HttpContext } from "../States/Context/HttpContext";
import { userIdFromURLLL } from "../Utils/Utils";

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

  const { loading, request, error, clearError } = useContext(HttpContext);

  useEffect(() => {
    setProfile(profileToEdit);
    window.M.updateTextFields();
  }, [profileToEdit]);

  const changeHandler = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

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
    request(`/api/profile/delete/${profileIdtoEdit}`, "DELETE", null, {
      Authorization: `Bearer ${auth.token}`,
    })
      .then(message)
      .catch(message)
      .finally(() => fetchProfiles());
  };

  // const fetchProfiles = async () => {
  //   try {
  //     if (window.location.href.match("/profiles/")) {
  //       const urlId = window.location.href.match("/profiles/")["index"] + 10;
  //       const urlParam = window.location.href.slice(urlId); // check if admin is looking for smbds profiles
  //       const profilesDataAdmin = await request(
  //         `/api/profile/get/${urlParam}`,
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
  // };

  // const refreshHandler = async () => {
  //   try {
  //     const data = await request(
  //       `/api/profile/edit/${profileIdtoEdit}`,
  //       "PUT",
  //       { ...profile },
  //       {
  //         Authorization: `Bearer ${auth.token}`,
  //       }
  //     );
  //     message(`${data.name} profile has been refreshed`); // notification
  //     fetchProfiles();
  //   } catch (e) {
  //     message(e);
  //   }
  // };

  // const deleteHandler = async () => {
  //   try {
  //     const data = await request(
  //       `/api/profile/delete/${profileIdtoEdit}`,
  //       "DELETE",
  //       null,
  //       {
  //         Authorization: `Bearer ${auth.token}`,
  //       }
  //     );
  //     message(data); // notification
  //     fetchProfiles();
  //   } catch (e) {
  //     message(e);
  //   }
  // };

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
