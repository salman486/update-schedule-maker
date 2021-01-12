import React, { Component } from "react";
import "./style.css";
import "./Teams.css";

class Teams extends Component {
  render() {
    return (
      <div className="Teams">
        <label className="Teams-label">Enter name: </label>
        <input type="text" className="Teams-input Teams-input--text" />

        <label className="Teams-label">Enter teams: </label>
        <input type="number" className="Teams-input Teams-input--number" />

        <button className="btn Teams-btn Teams-disabled" disabled>
          +
        </button>
      </div>
    );
  }
}

export default Teams;
