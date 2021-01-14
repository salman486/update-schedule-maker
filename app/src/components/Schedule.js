import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Teams from "./Teams";
import scheduleMaker, { getTeams } from "../working/scheduleMaker";
import "./style.css";
import "./Schedule.css";

let reset = false;
function Schedule(props) {
  const [teams, setTeams] = useState([]);
  const [currTeams, setCurrTeams] = useState("");

  useEffect(() => {
    if (!props.showSchedule) {
      setTeams([]);
      setCurrTeams([]);
      reset = true;
    } else {
      setTeams([{ teamId: uuidv4().slice(0, 8), teamName: "", teamValue: "" }]);
    }
    if (props.totalTeams !== 0) {
      setCurrTeams(props.totalTeams);
    }
  }, [props.showSchedule, props.totalTeams]);

  const addTeam = (team) => {
    reset = false;
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
        {teams.map((team, i) =>
          currTeams === 0 && teams.length === i + 1 ? (
            ""
          ) : (
            <Teams
              team={team}
              key={team.teamId}
              addTeam={addTeam}
              disable={teams.length === i + 1 ? false : true}
              reset={reset}
            />
          )
        )}
      </section>

      <button
        className={`Schedule-fixer-btn btn ${currTeams && "disabled"}`}
        disabled={currTeams}
        onClick={() => {
          props.showMatchFixer(true);
        }}
      >
        ADD MATCH FIXES
      </button>

      <button
        className={`Schedule-submit-btn btn ${currTeams && "disabled"}`}
        disabled={currTeams}
        onClick={() => {
          getTeams(teams);
          scheduleMaker();
        }}
      >
        COPY YOUR SCHEDULE
      </button>
    </div>
  );
}

export default Schedule;
