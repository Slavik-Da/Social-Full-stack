import React, { useContext, useEffect, useState } from "react";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../States/Context/AuthContext";
import { HttpContext } from "../States/Context/HttpContext";

export const ModalAdminUserEdit = ({ userToEdit, userIdToEdit, setUsers }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });

  const message = useMessage();
  const auth = useContext(AuthContext);

  const { request, error, clearError } = useContext(HttpContext);

  useEffect(() => {
    setUser(userToEdit);
    window.M.updateTextFields();
  }, [userToEdit]);

  const changeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const fetchUsers = () => {
    request("/api/user/", "GET", null, {
      Authorization: `Bearer ${auth.token}`,
    })
      .then(setUsers)
      .catch(message);
  };

  const refreshHandler = () => {
    request(
      `/api/user/edit/${userIdToEdit}`,
      "PUT",
      { ...user },
      {
        Authorization: `Bearer ${auth.token}`,
      }
    )
      .then(message)
      .catch(message)
      .finally(() => fetchUsers());
  };

  const deleteHandler = () => {
    request(`/api/user/delete/${userIdToEdit}`, "DELETE", null, {
      Authorization: `Bearer ${auth.token}`,
    })
      .then(message)
      .catch(message)
      .finally(() => fetchUsers());
  };

  //error handler
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  return (
    <div>
      <div className="input-field">
        <h6>User id: {userIdToEdit}</h6>
        <br />
      </div>

      <div className="input-field">
        <input
          placeholder="Enter email"
          id="email"
          type="email"
          name="email"
          value={user.email}
          onChange={changeHandler}
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="input-field">
        <input
          placeholder="Enter new password"
          id="password"
          type="password"
          name="password"
          value={user.password}
          onChange={changeHandler}
        />
        <label htmlFor="password">Password</label>
      </div>
      <p onChange={changeHandler}>
        <label>
          <input type="radio" name="role" value="USER" />
          <span>User role</span>
        </label>
        <br />
        <label>
          <input type="radio" name="role" value="ADMIN" />
          <span>Admin role</span>
        </label>
      </p>

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
