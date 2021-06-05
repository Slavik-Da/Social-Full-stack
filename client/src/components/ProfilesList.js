import React, { useEffect, useState } from "react";
import { Modal } from "./Modal.js";
import { NavLink } from "react-router-dom";
import { ModalUserEdit } from "./ModalUserEdit.js";

export const ProfilesList = ({ profiles }) => {
  const [modalActive, setModalActive] = useState(false);
  const [userIdtoEdit, setUserIdtoEdit] = useState(null)
  const [profileToEdit, setProfileToEdit]= useState({});

  if (!profiles.length) {
    return (
      <p>
        You have not profiles, you can go to
        <NavLink to="/"> user page</NavLink>
      </p>
    );
  }


  if (profiles)
    return (
      <>
      <Modal active={modalActive} setActive={setModalActive}>
        <ModalUserEdit profileToEdit={profileToEdit} userIdtoEdit={userIdtoEdit}/>
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
                  <td><button className="btn blue darken-2" onClick={()=>{
                    setModalActive(true)
                    setUserIdtoEdit(profile.id)
                    setProfileToEdit({
                      name:profile.name,
                      gender: profile.gender,
                      fullYears: profile.fullYears,
                      city: profile.city
                    })
                     }}>...</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </>
    );
};
