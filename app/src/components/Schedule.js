import React, { Component } from "react";
import Teams from "./Teams";
import "./style.css";
import "./Schedule.css";

class Schedule extends Component {
  render() {
    // const name = {border-top:'1px solid black'};
    return (
      <div className="Schedule">
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
}

export default Schedule;
