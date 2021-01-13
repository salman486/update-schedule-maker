import React, { useState } from "react";
// import { TeamsContext } from "../contexts/TeamsContext";
import "./style.css";
import "./Teams.css";

import { v4 as uuidv4 } from "uuid";

function Teams() {
  const [teamName, setTeamName] = useState("");
  const [teamValue, setTeamVaue] = useState("");

  function getTeamData() {
    if (teamName.length === 0 || teamValue <= 0 || !Number.isFinite(teamValue))
      return;
    console.log(teamName, teamValue);
  }

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
        onChange={(e) => setTeamVaue(+e.target.value)}
        value={teamValue}
      />

      <button className="btn Teams-btn" onClick={getTeamData}>
        +
      </button>
    </div>
  );
}

export default Teams;
