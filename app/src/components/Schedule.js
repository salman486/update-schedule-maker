import React, { useContext } from "react";
import Teams from "./Teams";
import "./style.css";
import "./Schedule.css";
import { TeamsContext } from "../contexts/TeamsContext";

function Schedule(props) {
  const totalTeams = useContext(TeamsContext);
  return (
    <div className={`Schedule ${props.showSchedule ? "" : "hidden"}`}>
      <div className="Schedule-teams-container">
        <p className="Schedule-teams">Remaining Teams: {totalTeams}</p>
      </div>

      <section className="Schedule-area">
        <Teams />
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
