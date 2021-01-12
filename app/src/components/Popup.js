import React from "react";
import "./Popup.css";
import "./style.css";

const Popup = (props) => {
  return (
    <section className={`${props.popup ? "" : "hidden"}`}>
      <div className="Popup"></div>
      <div className="Popup-content">
        <div>
          <label htmlFor="teams" className="Popup-teams--label">
            Entry Number of Teams:{" "}
          </label>
          <input type="number" className="Popup-teams--input" id="teams" />
        </div>

        <button className="btn Popup-btn">Submit</button>
      </div>
    </section>
  );
};

export default Popup;
