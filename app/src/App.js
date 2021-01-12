import React, { useState } from "react";

// css
import "./App.css";

// components
import Header from "./components/Header";
import Popup from "./components/Popup";
import Schedule from "./components/Schedule";

// contexts
import { TeamsContext } from "./contexts/TeamsContext";

function App() {
  const [popup, setPopup] = useState(false);

  function openPopup() {
    setPopup(true);
  }

  return (
    <TeamsContext.Provider value={128}>
      <div>
        <Popup popup={popup} />
        <Header popup={openPopup} />
        <Schedule />
      </div>
    </TeamsContext.Provider>
  );
}

export default App;
