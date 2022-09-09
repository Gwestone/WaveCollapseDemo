import "react";
import "./App.css";
import DrawPanel from "./components/DrawPanel";
import Generator from "./components/Generator";
import { useState } from "react";

function App() {
  return (
    <div className={"container"}>
      <div className="section1">
        <DrawPanel />
      </div>
      <div className="section2">
        <Generator />
      </div>
    </div>
  );
}

export default App;
