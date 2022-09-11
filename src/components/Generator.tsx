import "react";
import { useContext, useEffect, useRef, useState } from "react";
import { canvasContext } from "../context";
import { Gen } from "../utils/WaveCollapse";
const worker = new Worker("worker/gen.worker.js", { type: "module" });

function Generator() {
  const matrix = useContext(canvasContext);

  let sampleRef = useRef<HTMLCanvasElement>(null);
  const sampleContextRef = useRef<CanvasRenderingContext2D | null>(null);

  let outputRef = useRef<HTMLCanvasElement>(null);
  const outputRefContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    sampleContextRef.current = sampleRef.current!.getContext("2d");
    outputRefContextRef.current = outputRef.current!.getContext("2d");
    worker.onmessage = onWorker;
  }, []);

  function onGenButton() {
    let genMatrix: string[][] = new Array(500);
    matrix!.forEach((row, y) => {
      row.forEach((cell, x) => {
        sampleContextRef.current!.fillStyle = cell;
        sampleContextRef.current!.fillRect(x, y, 1, 1);
      });
    });
    worker.postMessage(sampleContextRef.current?.getImageData(0, 0, 10, 10)!);
    setLoadingState(true);
    //let data = Gen(sampleContextRef.current?.getImageData(0, 0, 10, 10)!);
    //outputRefContextRef.current?.putImageData(data, 0, 0);
  }

  function onWorker(message: MessageEvent<ImageData>) {
    outputRefContextRef.current?.putImageData(message.data, 0, 0);
    setLoadingState(false);
  }

  return (
    <>
      {loadingState ? <div>Loading now</div> : ""}
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
