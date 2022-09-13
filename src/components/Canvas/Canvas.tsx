import "react";
import { MouseEvent, useEffect, useRef, useState, TouchEvent } from "react";
import { clearMatrix } from "../../utils/StaticTypes";
import style from "./Canvas.module.css";
import { disableScroll, enableScroll } from "../../utils/Scroll";

function Canvas(prop: {
  drawColor: string;
  onDraw: (matrix: string[][]) => void;
  clear: boolean;
}) {
  const [matrix, setMatrix] = useState<string[][]>(
    JSON.parse(JSON.stringify(clearMatrix))
  );
  //init variables
  //-----------------------------
  let resX = 10;
  let resY = 10;
  let canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  let relativePixelHeight = useRef<number>(0);
  let relativePixelWidth = useRef<number>(0);

  //on clear button click
  //-----------------------------
  useEffect(() => {
    setMatrix((_) => {
      return JSON.parse(JSON.stringify(clearMatrix));
    });
  }, [prop.clear]);

  //setup component(componentDidMount)
  //-----------------------------
  useEffect(() => {
    canvasRef.current!.addEventListener("touchstart", (_) => {
      disableScroll(window);
    });
    canvasRef.current!.addEventListener("touchend", (_) => {
      enableScroll(window);
    });
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

    //check if color really changes
    if (matrix[yRelativePos - 1][xRelativePos - 1] !== drawColor) {
      //update state
      setMatrix((prevState) => {
        const matrix = JSON.parse(JSON.stringify(prevState));
        matrix[yRelativePos - 1][xRelativePos - 1] = drawColor;
        return matrix;
      });
    }
  }

  //on mouse click even listener
  //-----------------------------
  function onTouchMove(e: TouchEvent<HTMLCanvasElement>, drawColor: string) {
    let touche = e.touches[0];

    //calc the pos of relative pixel
    let rect = canvasRef.current!.getBoundingClientRect();
    let xRealPos = touche.clientX - rect.left;
    let yRealPos = touche.clientY - rect.top;

    let xRelativePos = Math.ceil(xRealPos / relativePixelHeight.current);
    let yRelativePos = Math.ceil(yRealPos / relativePixelWidth.current);

    //check if color really changes
    if (matrix[yRelativePos - 1][xRelativePos - 1] !== drawColor) {
      //update state
      setMatrix((prevState) => {
        const matrix = JSON.parse(JSON.stringify(prevState));
        matrix[yRelativePos - 1][xRelativePos - 1] = drawColor;
        return matrix;
      });
    }
  }

  //draw canvas with matrix change
  //-----------------------------
  useEffect(() => {
    //console.log("rerender");
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
    prop.onDraw(matrix);
  }, [matrix]);

  return (
    <>
      <canvas
        onMouseMove={(e) => onMouseMove(e, prop.drawColor)}
        onTouchMove={(e) => onTouchMove(e, prop.drawColor)}
        ref={canvasRef}
        className={style.canvas}
        width="500"
        height="500"
      ></canvas>
    </>
  );
}

export default Canvas;
