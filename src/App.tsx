import "react";
import styles from "./App.module.css";
import DrawPanel from "./components/DrawPannel/DrawPanel";
import Generator from "./components/Generator/Generator";
import { useState } from "react";
import { canvasContext } from "./context";

function App() {
  //get canvas data from draw panel and send in to GeneratorComponent component
  const [matrix, setMatrix] = useState<string[][] | null>(null);
  function onDraw(matrix: string[][]) {
    setMatrix(matrix);
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <DrawPanel onDraw={onDraw} />
      </div>
      <div className={styles.section}>
        <canvasContext.Provider value={matrix}>
          <Generator />
        </canvasContext.Provider>
      </div>
    </div>
  );
}

export default App;
