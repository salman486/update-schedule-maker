import React from "react";
import Teams from "./Teams";
import "./style.css";
import "./Schedule.css";

function Schedule() {
  return (
    <div className="Schedule hidden">
      <div className="Schedule-teams-container">
        <p className="Schedule-teams">Remaining Teams: 128</p>
      </div>

      <section className="Schedule-area">
        <Teams />
      </section>

      <button className="Schedule-submit-btn btn">COPY YOUR SCHEDULE</button>
      <button className="Schedule-reset-btn btn disabled" disabled>
        RESET SCHEDULE
      </button>
    </div>
  );
}

export default Schedule;
