// import React, { useContext } from "react";
// import { TeamsContext } from "../contexts/TeamsContext";
import "./style.css";
import "./Teams.css";

import { v4 as uuidv4 } from "uuid";

let counter = 0;
let currentTeams = 0;
let teamsData = [];

function Teams() {
  function getTeamData() {
    const teamNameEl = document.querySelector(`#tname-${counter}`);
    const teamValueEl = document.querySelector(`#tvalue-${counter}`);

    const teamName = teamNameEl.value.trim();
    const teamValue = +teamValueEl.value;

    if (teamName.length === 0 || teamValue <= 0 || !Number.isFinite(teamValue))
      return;
    teamsData.push({ teamId: uuidv4().slice(0, 8), teamName, teamValue });
    currentTeams += teamValue;
    counter++;

    const btnEl = document.querySelector(".Teams-btn");
    btnEl.classList.add("Teams-btn--disabled");
    teamNameEl.disabled = true;
    teamValueEl.disabled = true;
    btnEl.disabled = true;
  }

  return (
    <div className="Teams">
      <label className="Teams-label">Enter name: </label>
      <input
        type="text"
        className="Teams-input Teams-input--text"
        id={`tname-${counter}`}
      />

      <label className="Teams-label">Enter teams: </label>
      <input
        type="number"
        className="Teams-input Teams-input--number"
        id={`tvalue-${counter}`}
      />

      <button className="btn Teams-btn" onClick={getTeamData}>
        +
      </button>
    </div>
  );
}

export default Teams;
