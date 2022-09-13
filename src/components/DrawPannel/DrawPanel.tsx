import "react";
import Canvas from "../Canvas/Canvas";
import { useState } from "react";
import styles from "./DrawPannel.module.css";

function DrawPanel(prop: { onDraw: (matrix: string[][]) => void }) {
  const [color, setColor] = useState<coloursEnum>("red");
  const [clear, setClear] = useState(false);

  //send data to parent
  function onDraw(matrix: string[][]) {
    prop.onDraw(matrix);
  }

  function onClear() {
    setClear(!clear);
  }

  type coloursEnum =
    | "white"
    | "red"
    | "black"
    | "green"
    | "blue"
    | "yellow"
    | "gray"
    | "darkorange";

  return (
    <>
      <Canvas drawColor={color} onDraw={onDraw} clear={clear} />
      <div className={styles.controls}>
        <button onClick={onClear}>Clear</button>
        <br />
        <div className={styles.colors}>
          <button
            className={color === "red" ? styles.active : ""}
            style={{ background: "red" }}
            onClick={() => setColor("red")}
          ></button>
          <button
            className={color === "white" ? styles.active : ""}
            style={{ background: "white" }}
            onClick={() => setColor("white")}
          ></button>
          <button
            className={color === "black" ? styles.active : ""}
            style={{ background: "black" }}
            onClick={() => setColor("black")}
          ></button>
          <button
            className={color === "green" ? styles.active : ""}
            style={{ background: "green" }}
            onClick={() => setColor("green")}
          ></button>
          <button
            className={color === "blue" ? styles.active : ""}
            style={{ background: "blue" }}
            onClick={() => setColor("blue")}
          ></button>
          <button
            className={color === "yellow" ? styles.active : ""}
            style={{ background: "yellow" }}
            onClick={() => setColor("yellow")}
          ></button>
          <button
            className={color === "gray" ? styles.active : ""}
            style={{ background: "gray" }}
            onClick={() => setColor("gray")}
          ></button>
          <button
            className={color === "darkorange" ? styles.active : ""}
            style={{ background: "darkorange" }}
            onClick={() => setColor("darkorange")}
          ></button>
        </div>
      </div>
    </>
  );
}

export default DrawPanel;
