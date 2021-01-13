import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Teams from "./Teams";
import "./style.css";
import "./Schedule.css";
import { TeamsContext } from "../contexts/TeamsContext";

function Schedule(props) {
  const totalTeams = useContext(TeamsContext);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams([{ teamId: uuidv4().slice(0, 8), teamName: "", teamValue: "" }]);
    console.log(totalTeams);
  }, [totalTeams]);

  const addTeam = (team) => {
    setTeams((prevTeams) => [
      ...prevTeams,
      { teamId: uuidv4().slice(0, 8), ...team },
    ]);
    console.log(teams);
  };

  return (
    <div className={`Schedule ${props.showSchedule ? "" : "hidden"}`}>
      <div className="Schedule-teams-container">
        <p className="Schedule-teams">Remaining Teams: {totalTeams}</p>
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
