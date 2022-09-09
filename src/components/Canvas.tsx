import "react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { clearMatrix } from "../utils/Types";

let rerenderCount = 0;

function Canvas(prop: { drawColor: string }) {
  console.warn(`🔴 canvas rerender cound: [${++rerenderCount}]`);
  const [matrix, setMatrix] = useState<string[][]>(clearMatrix);

  //init variables
  //-----------------------------
  let resX = 10;
  let resY = 10;
  let canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  let relativePixelHeight = useRef<number>(0);
  let relativePixelWidth = useRef<number>(0);

  //setup component
  //-----------------------------
  useEffect(() => {
    console.log("main");
    contextRef.current = canvasRef.current!.getContext("2d");
    relativePixelHeight.current =
      canvasRef.current!.getBoundingClientRect().height / resY;
    relativePixelWidth.current =
      canvasRef.current!.getBoundingClientRect().width / resX;
  }, []);

  //on mouse click even listener
  //-----------------------------
  function onMouseMove(e: MouseEvent<HTMLCanvasElement>, drawColor: string) {
    //check if mouse button pressed
    //-----------------------------
    if (e.buttons !== 1) return;

    //calc the pos of relative pixel
    let rect = canvasRef.current!.getBoundingClientRect();
    let xRealPos = e.clientX - rect.left;
    let yRealPos = e.clientY - rect.top;

    let xRelativePos = Math.ceil(xRealPos / relativePixelHeight.current);
    let yRelativePos = Math.ceil(yRealPos / relativePixelWidth.current);

    if (matrix[yRelativePos - 1][xRelativePos - 1] !== drawColor) {
      //update state
      setMatrix((prevState) => {
        const matrix = [...prevState];
        matrix[yRelativePos - 1][xRelativePos - 1] = drawColor;
        return matrix;
      });
    }
  }

  //draw canvas with matrix change
  //-----------------------------
  useEffect(() => {
    console.log("rerender");
    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        //draw pixel at location
        contextRef.current!.fillStyle = cell;
        contextRef.current!.fillRect(
          x * relativePixelWidth.current,
          y * relativePixelHeight.current,
          relativePixelWidth.current,
          relativePixelHeight.current
        );
      });
    });
  }, [matrix]);

  return (
    <canvas
      onMouseMove={(e) => onMouseMove(e, prop.drawColor)}
      ref={canvasRef}
      id="canvas"
      width="500"
      height="500"
    ></canvas>
  );
}

export default Canvas;
