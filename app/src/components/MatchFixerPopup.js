import React from "react";
import MatchFixer from "./MatchFixer";
import "./MatchFixerPopup.css";
import "./style.css";

function MatchFixerPopup({ popup, showMatchFixer }) {
  return (
    <div className={`MatchFixerPopup ${popup ? "" : "hidden"}`}>
      <div
        className="closeMatchFixerPopup"
        onClick={() => showMatchFixer(false)}
      ></div>

      <div className="MatchFixerArea">
        <h1 className="MatchFixer-heading">
          Remember name should be exactly same
        </h1>
        <div className="MatchFixer-main">
          <MatchFixer />
          <MatchFixer />
          <MatchFixer />
          <MatchFixer />
          <MatchFixer />
          <MatchFixer />
          <MatchFixer />
          <MatchFixer />
          <MatchFixer />
        </div>
        <button className="MatchFixer-submitbtn">DONE</button>
        <h3 className="MatchFixer-caution">
          You can add more names in second coloumn seprate by space
        </h3>
      </div>
    </div>
  );
}

export default MatchFixerPopup;
