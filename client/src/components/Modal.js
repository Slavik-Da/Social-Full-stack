import React from "react";

import "./Modal.css";

export const Modal = ({ active, setActive, children }) => {

  return (
    <div
      className={active ? "modalW active" : "modalW"}
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className={active ? "modalW__content active" : "modalW__content"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
