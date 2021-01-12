import React, { Component } from "react";
import "./Header.css";
import "./style.css";

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1 className="Header-heading">Schedule Maker</h1>
        <button className="Header-new-btn btn">New Schedule</button>
      </header>
    );
  }
}

export default Header;
