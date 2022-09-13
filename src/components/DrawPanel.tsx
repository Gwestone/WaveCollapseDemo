import "react";
import Canvas from "./Canvas";
import { useState } from "react";

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
    | "purple"
    | "lime"
    | "gray"
    | "darkorange";

  return (
    <>
      <Canvas drawColor={color} onDraw={onDraw} clear={clear} />
      <div className="controls">
        <button onClick={onClear}>Clear</button>
        <br />
        <div className="colors">
          <button
            className={color === "red" ? "active" : ""}
            style={{ background: "red" }}
            onClick={() => setColor("red")}
          ></button>
          <button
            className={color === "white" ? "active" : ""}
            style={{ background: "white" }}
            onClick={() => setColor("white")}
          ></button>
          <button
            className={color === "black" ? "active" : ""}
            style={{ background: "black" }}
            onClick={() => setColor("black")}
          ></button>
          <button
            className={color === "green" ? "active" : ""}
            style={{ background: "green" }}
            onClick={() => setColor("green")}
          ></button>
          <button
            className={color === "purple" ? "active" : ""}
            style={{ background: "purple" }}
            onClick={() => setColor("purple")}
          ></button>
          <button
            className={color === "lime" ? "active" : ""}
            style={{ background: "lime" }}
            onClick={() => setColor("lime")}
          ></button>
          <button
            className={color === "gray" ? "active" : ""}
            style={{ background: "gray" }}
            onClick={() => setColor("gray")}
          ></button>
          <button
            className={color === "darkorange" ? "active" : ""}
            style={{ background: "darkorange" }}
            onClick={() => setColor("darkorange")}
          ></button>
        </div>
      </div>
    </>
  );
}

export default DrawPanel;
