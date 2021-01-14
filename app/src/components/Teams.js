import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import "./Teams.css";
import { TeamsContext } from "../contexts/TeamsContext";

let totalTeams;
let currentTeams = 0;
function Teams({ addTeam, disable, reset }) {
  const [teamName, setTeamName] = useState("");
  const [teamValue, setTeamValue] = useState("");
  totalTeams = useContext(TeamsContext);
  if (reset) {
    currentTeams = 0;
  }

  function getTeamData() {
    const tname = teamName.trim();
    const tvalue = +teamValue;
    if (
      tname.length === 0 ||
      tvalue <= 0 ||
      !Number.isFinite(tvalue) ||
      currentTeams + tvalue > totalTeams
    )
      return;
    currentTeams += tvalue;
    addTeam({ teamName: tname, teamValue: tvalue });
  }

  return (
    <div className="Teams">
      <label className="Teams-label">Enter name: </label>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="Teams-input Teams-input--text"
        disabled={disable}
      />

      <label className="Teams-label">Enter teams: </label>
      <input
        value={teamValue}
        onChange={(e) => setTeamValue(e.target.value)}
        type="number"
        className="Teams-input Teams-input--number"
        disabled={disable}
      />

      <button
        className={`btn Teams-btn ${disable ? "Teams-btn--disabled" : ""}`}
        onClick={getTeamData}
        disabled={disable}
      >
        +
      </button>
    </div>
  );
}

export default Teams;
