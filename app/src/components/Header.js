import React from "react";
import "./Header.css";
import "./style.css";

function Header(props) {
  return (
    <header className="Header">
      <h1 className="Header-heading">Schedule Maker</h1>
      <button className="Header-new-btn btn" onClick={props.popup}>
        New Schedule
      </button>
    </header>
  );
}

export default Header;
