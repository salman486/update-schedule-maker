import "./App.css";
import Header from "./components/Header";
import Popup from "./components/Popup";
import Schedule from "./components/Schedule";
// import { v4 as uuidv4 } from "uuid";

function App() {
  return (
    <div>
      <Popup />
      <Header />
      <Schedule />
    </div>
  );
}

export default App;
