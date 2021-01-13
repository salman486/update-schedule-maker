import React, { useState } from "react";
import "./style.css";
import "./Teams.css";

function Teams({ addTeam, disable }) {
  const [teamName, setTeamName] = useState("");
  const [teamValue, setTeamValue] = useState(0);

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
        onClick={() => addTeam({ teamName, teamValue })}
        disabled={disable}
      >
        +
      </button>
    </div>
  );
}

export default Teams;
