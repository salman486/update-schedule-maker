import React from "react";
import "./Popup.css";
import "./style.css";

function Popup(props) {
  function inputHandler() {
    const totalTeams = +document.querySelector("#teams").value;
    if (!(totalTeams && Number.isFinite(totalTeams) && totalTeams % 2 === 0))
      return;
    props.closePopup(totalTeams);
    document.querySelector("#teams").value = "";
  }

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

        <button className="btn Popup-btn" onClick={inputHandler}>
          Submit
        </button>
      </div>
    </section>
  );
}

export default Popup;
