import React, { useState, useEffect } from "react";
import GetMatchFixes from "./GetMatchFixes";
import { v4 as uuidv4 } from "uuid";
import "./MatchFixerPopup.css";
import "./style.css";
import "../working/scheduleMaker";
import { getFixes } from "../working/scheduleMaker";

let done = false;
function MatchFixerPopup({ popup, showMatchFixer, reset }) {
  const [totalFixes, setTotalFixes] = useState([]);

  useEffect(() => {
    if (reset) {
      setTotalFixes([{ key: uuidv4().slice(0, 8), none: ["noone"] }]);
    }
  }, [reset]);

  useEffect(() => {
    setTotalFixes([]);
    setTotalFixes([{ key: uuidv4().slice(0, 8), none: ["noone"] }]);
  }, [done]);

  function addFixes(currFix) {
    setTotalFixes((prevState) => [
      ...prevState,
      { key: uuidv4().slice(0, 8), ...currFix },
    ]);
    console.log(totalFixes);
  }
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
          {totalFixes.map((fix, i) => (
            <GetMatchFixes
              addFixes={addFixes}
              key={fix.key}
              disable={totalFixes.length === i + 1 ? false : true}
            />
          ))}
        </div>
        <button
          className="MatchFixer-submitbtn"
          onClick={() => {
            getFixes(totalFixes);
            showMatchFixer(false);
            done = true;
          }}
        >
          DONE
        </button>
        <h3 className="MatchFixer-caution">
          You can add more names in second coloumn seprate by space
        </h3>
      </div>
    </div>
  );
}

export default MatchFixerPopup;
