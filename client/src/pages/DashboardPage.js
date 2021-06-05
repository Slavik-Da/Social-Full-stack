import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../States/Context/AuthContext";
import { HttpContext } from "../States/Context/HttpContext";

export const DashboardPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useContext(HttpContext);
  const [dash, setDash] = useState(null);

  const message = useMessage();

  //error handler
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const fetchDash = useCallback(async () => {
    try {
      const dashboard = await request("/api/user/dashboard", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      console.log(dashboard);
      setDash(dashboard);
    } catch (e) {
      message(e);
    }
  }, [auth.token, request, message]);
  useEffect(() => {
    fetchDash();
  }, [fetchDash]);
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Dashboard page</h1>
      <table>
        <thead>
          <tr>
            <th>Users count</th>
            <th>Profiles count</th>
            <th>18+ Profiles count</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{dash?.userCount}</td>
            <td>{dash?.profileCount}</td>
            <td>{dash?.oldPeople}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
