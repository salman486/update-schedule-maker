import React, { useState } from "react";

// css
import "./App.css";

// components
import Header from "./components/Header";
import Popup from "./components/Popup";
import Schedule from "./components/Schedule";
import MatchFixerPopup from "./components/MatchFixerPopup";

// contexts
import { TeamsContext } from "./contexts/TeamsContext";

let totalTeams = 0;

function App() {
  const [popup, setPopup] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showMatchFixer, setShowMatchFixer] = useState(false);

  // function calls from Header when click on new schedule btn and set popup to true
  function openPopup() {
    setPopup(true);
    setShowSchedule(false);
  }

  // function calls from Popup when get validate data successfuly and set popup to false
  function closePopup(teams) {
    setPopup(false);
    totalTeams = teams;

    // show schedule as we get data successfully
    setShowSchedule(true);
  }

  function showMatchFixerPopup(show) {
    setShowMatchFixer(show);
  }

  return (
    <TeamsContext.Provider value={totalTeams}>
      <div>
        <MatchFixerPopup
          popup={showMatchFixer}
          showMatchFixer={showMatchFixerPopup}
        />
        <Popup popup={popup} closePopup={closePopup} />
        <Header openPopup={openPopup} />
        <Schedule
          showSchedule={showSchedule}
          totalTeams={totalTeams}
          showMatchFixer={showMatchFixerPopup}
        />
      </div>
    </TeamsContext.Provider>
  );
}

export default App;
