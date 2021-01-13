import React, { useState, useContext, useEffect } from "react";
import Teams from "./Teams";
import "./style.css";
import "./Schedule.css";
import { TeamsContext } from "../contexts/TeamsContext";
import { v4 as uuidv4 } from "uuid";

function Schedule(props) {
  const totalTeams = useContext(TeamsContext);
  const [teams, setTeams] = useState([1]);

  useEffect(() => {
    setTeams([{ teamId: uuidv4().slice(0, 8), teamName: "", teamValue: "" }]);
    console.log(totalTeams);
  }, [totalTeams]);

  const addTeams = (team) => {
    setTeams((prevTeams) => {
      console.log(prevTeams);
      return [...prevTeams, { teamId: uuidv4().slice(0, 8), ...team }];
    });
  };

  return (
    <div className={`Schedule ${props.showSchedule ? "" : "hidden"}`}>
      <div className="Schedule-teams-container">
        <p className="Schedule-teams">Remaining Teams: </p>
      </div>

      <section className="Schedule-area">
        {teams.map((_) => (
          <Teams addTeams={addTeams} key={uuidv4()} />
        ))}
      </section>

      <button className="Schedule-submit-btn btn disabled" disabled>
        COPY YOUR SCHEDULE
      </button>
      <button className="Schedule-reset-btn btn disabled" disabled>
        RESET SCHEDULE
      </button>
    </div>
  );
}

export default Schedule;
