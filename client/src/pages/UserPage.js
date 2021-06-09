import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../States/Context/AuthContext";
import { HttpContext } from "../States/Context/HttpContext";

export const UserPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { request, error, clearError } = useContext(HttpContext);
  const history = useHistory();

  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    fullYears: "",
    city: "",
  });

  //error handler
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields(); //makes active input fields
  }, []);

  const createHandler = () => {
    request(
      "/api/profile/create",
      "POST",
      { ...profile },
      {
        Authorization: `Bearer ${auth.token}`,
      }
    )
      .then(message)
      .then(history.push("/profiles"))
      .catch(message);
  };

  const changeHandler = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <h1>Create new profile </h1>
        <div className="input-field">
          <input
            placeholder="Enter full name"
            id="profileName"
            type="text"
            name="name"
            value={profile.profileName}
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
          <button className="btn green darken-1" onClick={createHandler}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
