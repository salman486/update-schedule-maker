import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Teams from "./Teams";
import "./style.css";
import "./Schedule.css";

function Schedule(props) {
  const [teams, setTeams] = useState([]);
  const [currTeams, setCurrTeams] = useState("");

  useEffect(() => {
    setTeams([{ teamId: uuidv4().slice(0, 8), teamName: "", teamValue: "" }]);
  }, []);

  useEffect(() => {
    if (props.totalTeams !== 0) setCurrTeams(props.totalTeams);
  }, [props.totalTeams]);

  const addTeam = (team) => {
    setTeams((prevTeams) => [
      ...prevTeams,
      { teamId: uuidv4().slice(0, 8), ...team },
    ]);
    setCurrTeams(currTeams - team["teamValue"]);
  };

  return (
    <div className={`Schedule ${props.showSchedule ? "" : "hidden"}`}>
      <div className="Schedule-teams-container">
        <p
          className={`Schedule-teams ${
            currTeams ? "color-red" : "color-green"
          }`}
        >
          Remaining Teams: {currTeams}
        </p>
      </div>

      <section className="Schedule-area">
        {teams.map((team, i) => (
          <Teams
            team={team}
            key={team.teamId}
            addTeam={addTeam}
            disable={teams.length === i + 1 ? false : true}
          />
        ))}
      </section>

      <button
        className={`Schedule-submit-btn btn ${currTeams && "disabled"}`}
        disabled={currTeams}
      >
        COPY YOUR SCHEDULE
      </button>
      <button
        className={`Schedule-reset-btn btn ${currTeams && "disabled"}`}
        disabled={currTeams}
      >
        RESET SCHEDULE
      </button>
    </div>
  );
}

export default Schedule;
