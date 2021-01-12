import React, { useContext } from "react";
import { TeamsContext } from "../contexts/TeamsContext";
import "./style.css";
import "./Teams.css";

import { v4 as uuidv4 } from "uuid";

let counter = 0;
let currentTeams = 0;
let teamsData = [];
let totalTeams = 0;

function teamsHtmlMaker(counter) {
  return `<div class="Teams">
        <label class="Teams-label">Enter name: </label>
        <input
          type="text"
          class="Teams-input Teams-input--text"
          id=tname-${counter}
        />

        <label class="Teams-label">Enter teams: </label>
        <input
          type="number"
          class="Teams-input Teams-input--number"
          id=tvalue-${counter}
        />

        <button class="btn Teams-btn" id=tbtn-${counter}>
          +
        </button>
      </div>`;
}

function disableElements(...elements) {
  elements.forEach((element) => {
    element.disabled = true;
  });
}

function updateData(teamName, teamValue) {
  teamsData.push({ teamId: uuidv4().slice(0, 8), teamName, teamValue });
  currentTeams += teamValue;
  counter++;
  document.querySelector(".Schedule-teams").innerText = `Remaining Teams: ${
    totalTeams - currentTeams
  }`;

  console.log(teamsData);
  console.log(currentTeams);
  console.log(totalTeams);
}

function getTeamData() {
  const teamNameEl = document.querySelector(`#tname-${counter}`);
  const teamValueEl = document.querySelector(`#tvalue-${counter}`);
  const btnEl = document.querySelector(`#tbtn-${counter}`);

  const teamName = teamNameEl.value.trim();
  const teamValue = +teamValueEl.value;

  let tempTeamsCalc = currentTeams + teamValue;
  if (
    teamName.length === 0 ||
    teamValue <= 0 ||
    !Number.isFinite(teamValue) ||
    tempTeamsCalc > totalTeams
  )
    return;
  btnEl.classList.add("Teams-btn--disabled");
  disableElements(teamNameEl, teamValueEl, btnEl);
  updateData(teamName, teamValue);

  if (!(currentTeams === totalTeams)) {
    const html = teamsHtmlMaker(counter);
    document
      .querySelector(".Teams-container")
      .insertAdjacentHTML("beforeend", html);

    if (counter > 0) {
      document
        .querySelector(`#tbtn-${counter}`)
        .addEventListener("click", () => {
          getTeamData();
        });
    }
  } else {
    document.querySelector(".Schedule-submit-btn").disabled = false;
    document.querySelector(".Schedule-submit-btn").classList.remove("disabled");
    document.querySelector(".Schedule-reset-btn").disabled = false;
    document.querySelector(".Schedule-reset-btn").classList.remove("disabled");
  }
}

function Teams(props) {
  totalTeams = useContext(TeamsContext);
  return (
    <div className="Teams-container">
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

        <button
          className="btn Teams-btn"
          onClick={() => {
            getTeamData();
          }}
          id={`tbtn-${counter}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Teams;
