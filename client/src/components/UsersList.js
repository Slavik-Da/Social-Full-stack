import React, { useEffect, useState } from "react";
import { Modal } from "./Modal.js";
import { NavLink } from "react-router-dom";
import { ProfilesPage } from "../pages/ProfilesPage";
import { ModalAdminUserEdit } from "./ModalAdminUserEdit.js";

export const UsersList = ({ users, setUsers }) => {
  const [modalActive, setModalActive] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const [userToEdit, setUserToEdit] = useState({});

  if (!users.length) {
    return <h2>User list is empty</h2>;
  }

  if (users)
    return (
      <div>
        <div>
          <Modal active={modalActive} setActive={setModalActive}>
            <ModalAdminUserEdit
              userToEdit={userToEdit}
              userIdToEdit={userIdToEdit}
              setUsers={setUsers}
            />
          </Modal>
          <table>
            <thead>
              <tr>
                <th>User id</th>
                <th>Email</th>
                <th>User role</th>
                <th>Edit</th>
                <th>Go to profiles</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="btn blue darken-2"
                        onClick={() => {
                          setModalActive(true);
                          setUserIdToEdit(user.id);
                          setUserToEdit({
                            email: user.email,
                            role: user.role,
                          });
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <NavLink to={`/profiles/${user.id}`}>
                      <button className="btn blue darken-3">
                        Go to profiles
                      </button>
                      </NavLink>
                    
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
};
