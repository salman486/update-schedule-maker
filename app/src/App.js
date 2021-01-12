import React, { useState } from "react";

// css
import "./App.css";

// components
import Header from "./components/Header";
import Popup from "./components/Popup";
import Schedule from "./components/Schedule";

// contexts
import { TeamsContext } from "./contexts/TeamsContext";

let totalTeams = 0;

function App() {
  const [popup, setPopup] = useState(false);

  // function calls from Header when click on new schedule btn and set popup to true
  function openPopup() {
    setPopup(true);
  }

  // function calls from Popup when get validate data successfuly and set popup to false
  function closePopup(teams) {
    setPopup(false);
    totalTeams = teams;
  }

  return (
    <TeamsContext.Provider value={totalTeams}>
      <div>
        <Popup popup={popup} closePopup={closePopup} />
        <Header openPopup={openPopup} />
        <Schedule />
      </div>
    </TeamsContext.Provider>
  );
}

export default App;
