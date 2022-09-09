import "react";
import { useContext, useEffect } from "react";
import { canvasContext } from "../context";
import GeneratorCanvas from "./GeneratorCanvas";

function Generator() {
  const matrix = useContext(canvasContext);
  function onGenButton() {
    console.log(matrix);
    console.log("gen button");
  }

  return (
    <>
      <GeneratorCanvas />
      <div className="controls">
        <button onClick={onGenButton}>generate</button>
      </div>
    </>
  );
}

export default Generator;
