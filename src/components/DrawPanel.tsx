import "react";
import Canvas from "./Canvas";
import { useState } from "react";

function DrawPanel() {
  type coloursEnum =
    | "white"
    | "red"
    | "black"
    | "green"
    | "purple"
    | "lime"
    | "gray"
    | "darkorange";
  const [color, setColor] = useState<coloursEnum>("red");
  return (
    <>
      <Canvas drawColor={color} />
      <div className="controls">
        <button>gen random</button>
        <button>gen select</button>
        <br />
        <button>clear</button>
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
