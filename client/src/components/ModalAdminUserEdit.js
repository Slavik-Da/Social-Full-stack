import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../States/Context/AuthContext";
import { HttpContext } from "../States/Context/HttpContext";

export const ModalAdminUserEdit = ({ userToEdit, userIdToEdit }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });

  const message = useMessage();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const { loading, request, error, clearError } = useContext(HttpContext);

  useEffect(() => {
    setUser(userToEdit);
    window.M.updateTextFields();
  }, [userToEdit]);

  const changeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log(user);
  };

  const refreshHandler = async () => {
    try {
      const data = await request(
        `/api/user/edit/${userIdToEdit}`,
        "PUT",
        { ...user },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      message(`User with id ${userIdToEdit} has been refreshed`); // notification
      history.push("/");
    } catch (e) {
      message(e);
    }
  };

  const deleteHandler = async () => {
    try {
      const data = await request(
        `/api/user/delete/${userIdToEdit}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      message(`User with id ${userIdToEdit} has been deleted`); // notification
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
        <h6>User id: {userIdToEdit}</h6>
        <br/>
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
