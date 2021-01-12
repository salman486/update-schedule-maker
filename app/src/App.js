// css
import "./App.css";

// components
import Header from "./components/Header";
import Popup from "./components/Popup";
import Schedule from "./components/Schedule";

// contexts
import { TeamsContext } from "./contexts/TeamsContext";

// import { v4 as uuidv4 } from "uuid";

function App() {
  return (
    <TeamsContext.Provider value={128}>
      <div>
        <Popup />
        <Header />
        <Schedule />
      </div>
    </TeamsContext.Provider>
  );
}

export default App;
