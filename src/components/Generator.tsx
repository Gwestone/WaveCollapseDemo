import "react";
import { useContext, useEffect, useRef } from "react";
import { canvasContext } from "../context";
import { Gen } from "../utils/WaveCollapse";

function Generator() {
  const matrix = useContext(canvasContext);

  let sampleRef = useRef<HTMLCanvasElement>(null);
  const sampleContextRef = useRef<CanvasRenderingContext2D | null>(null);

  let outputRef = useRef<HTMLCanvasElement>(null);
  const outputRefContextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    sampleContextRef.current = sampleRef.current!.getContext("2d");
    outputRefContextRef.current = outputRef.current!.getContext("2d");
  }, []);

  function onGenButton() {
    let genMatrix: string[][] = new Array(500);
    matrix!.forEach((row, y) => {
      row.forEach((cell, x) => {
        sampleContextRef.current!.fillStyle = cell;
        sampleContextRef.current!.fillRect(x, y, 1, 1);
      });
    });

    let data = Gen(sampleContextRef.current?.getImageData(0, 0, 10, 10)!);
    let imageData = new ImageData(new Uint8ClampedArray(data), 500, 500);
    outputRefContextRef.current?.putImageData(imageData, 0, 0);
  }

  return (
    <>
      <canvas
        ref={sampleRef}
        className={"sample"}
        width={10}
        height={10}
      ></canvas>
      <canvas
        ref={outputRef}
        className={"generator"}
        height={500}
        width={500}
      ></canvas>
      <div className="controls">
        <button onClick={onGenButton}>generate</button>
      </div>
    </>
  );
}

export default Generator;
