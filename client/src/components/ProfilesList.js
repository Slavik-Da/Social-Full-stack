import React, { useEffect, useState } from "react";
import { Modal } from "./Modal.js";
import { NavLink } from "react-router-dom";
import { ModalUserEdit } from "./ModalUserEdit.js";
import { userIdFromURL } from "../Utils/Utils.js";

export const ProfilesList = ({ profiles, setProfiles }) => {
  const [modalActive, setModalActive] = useState(false);
  const [profileIdtoEdit, setProfileIdtoEdit] = useState(null);
  const [profileToEdit, setProfileToEdit] = useState({});

  // if (!profiles.length && !window.location.href.match("/profiles/")) {
  //   return (
  //     <p>
  //       User have not profiles, you can go back to
  //       <NavLink to="/admin"> Admin page</NavLink>
  //     </p>
  //   );
  // }

  if (!profiles.length && userIdFromURL()) {
    return (
      <p>
        User with id: {userIdFromURL()} have not profiles, you can go back to
        <NavLink to="/admin"> Admin page</NavLink>
      </p>
    );
  }

  if (!profiles.length) {
    return (
      <p>
        Profiles list is empty, you can go to
        <NavLink to="/"> Create page</NavLink>
      </p>
    );
  }

  if (profiles)
    return (
      <>
        <Modal active={modalActive} setActive={setModalActive}>
          <ModalUserEdit
            profileToEdit={profileToEdit}
            profileIdtoEdit={profileIdtoEdit}
            setProfiles={setProfiles}
          />
        </Modal>
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>City</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {profiles.map((profile) => {
                return (
                  <tr key={profile.id}>
                    <td>{profile.id}</td>
                    <td>{profile.name}</td>
                    <td>{profile.gender}</td>
                    <td>{profile.fullYears}</td>
                    <td>{profile.city}</td>
                    <td>
                      <button
                        className="btn blue darken-2"
                        onClick={() => {
                          setModalActive(true);
                          setProfileIdtoEdit(profile.id);
                          setProfileToEdit({
                            name: profile.name,
                            gender: profile.gender,
                            fullYears: profile.fullYears,
                            city: profile.city,
                          });
                        }}
                      >
                        ...
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
};
