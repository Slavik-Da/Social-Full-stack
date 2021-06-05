import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../States/Context/AuthContext";
import { HttpContext } from "../States/Context/HttpContext";

export const ModalUserEdit = ({ profileToEdit, userIdtoEdit }) => {
  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    fullYears: "",
    city: "",
  });
  const message = useMessage();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const { loading, request, error, clearError } = useContext(HttpContext);

  useEffect(() => {
    setProfile(profileToEdit);
    window.M.updateTextFields();
  }, [profileToEdit]);


  const changeHandler = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };
  
  const refreshHandler = async () => {
    try {
      const data = await request(
        `/api/profile/edit/${userIdtoEdit}`,
        "PUT",
        { ...profile },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      message(`${data.name} profile has been refreshed`); // notification
      history.push("/profiles");
    } catch (e) {
      message(e);
    }
  };

  const deleteHandler = async () => {
    try {
      const data = await request(
        `/api/profile/delete/${userIdtoEdit}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      message(`Profile has been deleted`); // notification
      history.push("/profiles");
    } catch (e) {
      message(e);
    }
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
      </div>
      <div className="card-action">
        <button className="btn red ligthten-1" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};
