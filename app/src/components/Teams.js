import React, { useState } from "react";
// import { TeamsContext } from "../contexts/TeamsContext";
import "./style.css";
import "./Teams.css";

function Teams(props) {
  const [teamName, setTeamName] = useState("");
  const [teamValue, setTeamValue] = useState("");

  return (
    <div className="Teams">
      <label className="Teams-label">Enter name: </label>
      <input
        type="text"
        className="Teams-input Teams-input--text"
        onChange={(e) => setTeamName(e.target.value)}
        value={teamName}
      />

      <label className="Teams-label">Enter teams: </label>
      <input
        type="number"
        className="Teams-input Teams-input--number"
        onChange={(e) => setTeamValue(e.target.value)}
        value={teamValue}
      />

      <button
        className="btn Teams-btn"
        onClick={() => {
          props.addTeams([teamName, teamValue]);
        }}
      >
        +
      </button>
    </div>
  );
}

export default Teams;
