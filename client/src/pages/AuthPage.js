import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../States/Context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { HttpContext } from "../States/Context/HttpContext";
import { Loader } from "../components/Loader";
export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useContext(HttpContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  //error handler
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields(); //makes active input fields
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/user/registration", "POST", { ...form });
      message(data.message); // notification
      window.M.updateTextFields(); // makes active input fields
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/user/login", "POST", { ...form });
      auth.login(data.token, data.userId, data.userRole);
    } catch (e) {}
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="row">
        <div className="col s6 offset-s3">
          <h1>ITOP network</h1>
          <div className="card grey lighten-5">
            <div className="card-content black-text">
              <span className="card-title">Authorization</span>
              <div>
                <div className="input-field">
                  <input
                    placeholder="Enter your email"
                    id="email"
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">email</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Enter your password"
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={changeHandler}
                    disabled={loading}
                  />
                  <label htmlFor="password">password</label>
                </div>
                <p onChange={changeHandler}>
                  <label>
                    <input type="radio" name="role" value="USER" />
                    <span>Register as user</span>
                  </label>
                  <br />
                  <label>
                    <input type="radio" name="role" value="ADMIN" />
                    <span>Register as admin</span>
                  </label>
                </p>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn blue darken-1"
                style={{ marginRight: 10 }}
                onClick={loginHandler}
                disabled={loading}
              >
                Login
              </button>
              <button
                className="btn blue darken-2"
                onClick={registerHandler}
                disabled={loading}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </h1>
    </div>
  );
};
