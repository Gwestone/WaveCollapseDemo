import "react";
import "./App.css";
import DrawPanel from "./components/DrawPanel";
import Generator from "./components/Generator";
import { useState } from "react";
import { canvasContext } from "./context";

let rerenderCount = 0;

function App() {
  console.warn(`🔴 canvas rerender cound: [${++rerenderCount}]`);
  const [matrix, setMatrix] = useState<string[][] | null>(null);
  function onDraw(matrix: string[][]) {
    setMatrix(matrix);
  }

  return (
    <div className={"container"}>
      <div className="section">
        <DrawPanel onDraw={onDraw} />
      </div>
      <div className="section">
        <canvasContext.Provider value={matrix}>
          <Generator />
        </canvasContext.Provider>
      </div>
    </div>
  );
}

export default App;
