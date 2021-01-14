import "./GetMatchFixes.css";
import React, { useState } from "react";

function GetMatchFixes(props) {
  const [team1, setTeam1] = useState("");
  const [otherTeams, setOtherTeams] = useState("");
  // {salman: []}

  function validateFixes(addFixes) {
    const team = team1.trim();
    const otherTeamsArr = otherTeams
      .split(" ")
      .filter((team) => team.length > 0);

    if (team.length === 0 || otherTeamsArr.length === 0) {
      return;
    } else {
      addFixes({ [team]: otherTeamsArr });
    }
  }

  return (
    <div className="Match-fixer">
      <input
        type="text"
        className="MatchFixer-input MatchFixer-input--team1"
        onChange={(e) => {
          setTeam1(e.target.value);
        }}
        value={team1}
        disabled={props.disable}
      />
      <span className="notwith">NOT WITH</span>
      <input
        type="text"
        className="MatchFixer-input MatchFixer-input--team2"
        onChange={(e) => {
          setOtherTeams(e.target.value);
        }}
        value={otherTeams}
        disabled={props.disable}
      />
      <button
        className={`Match-fixer-newbtn ${
          props.disable ? "Match-fixer-newbtn-disabled" : ""
        }`}
        onClick={() => {
          validateFixes(props.addFixes);
        }}
        disabled={props.disable}
      >
        +
      </button>
    </div>
  );
}

export default GetMatchFixes;
