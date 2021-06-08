import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { UsersList } from "../components/UsersList";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../States/Context/AuthContext";
import { HttpContext } from "../States/Context/HttpContext";

export const AdminPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useContext(HttpContext);
  const [users, setUsers] = useState([]);

  //error handler
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    fetchUsersThen();
  }, []);

  const fetchUsersThen = () => {
    request("/api/user/", "GET", null, {
      Authorization: `Bearer ${auth.token}`,
    })
      .then(setUsers)
      .catch(message);
  };

  // const fetchUsers = useCallback(async () => {
  //   try {
  //     const usersData = await request("/api/user/", "GET", null, {
  //       Authorization: `Bearer ${auth.token}`,
  //     });
  //     setUsers(usersData);
  //     console.log(usersData);
  //   } catch (e) {}
  // }, [auth.token, request]);

  // useEffect(() => {
  //   fetchUsers();
  // }, [fetchUsers]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h1>Admin page</h1>
      {!loading && <UsersList users={users} setUsers={setUsers} />}
    </div>
  );
};
