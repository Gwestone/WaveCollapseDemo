import "react";
import { useContext, useEffect, useRef, useState } from "react";
import { canvasContext } from "../../context";
const worker = new Worker(
  "/public/worker/gen.worker.js?type=module&worker_file",
  { type: "module" }
);

import styles from "./Generator.module.css";

function Generator() {
  //get data from drawing component
  const matrix = useContext(canvasContext);

  //small sample canvas ref
  let sampleRef = useRef<HTMLCanvasElement>(null);
  const sampleContextRef = useRef<CanvasRenderingContext2D | null>(null);

  //main output canvas ref
  let outputRef = useRef<HTMLCanvasElement>(null);
  const outputRefContextRef = useRef<CanvasRenderingContext2D | null>(null);

  //block buttons when computing output
  const [loadingState, setLoadingState] = useState(false);

  //init component(componentDidMount)
  //-----------------------------
  useEffect(() => {
    sampleContextRef.current = sampleRef.current!.getContext("2d");
    outputRefContextRef.current = outputRef.current!.getContext("2d");
    worker.onmessage = onWorker;
  }, []);

  //compute result
  //-----------------------------
  function onGenButton() {
    matrix!.forEach((row, y) => {
      row.forEach((cell, x) => {
        sampleContextRef.current!.fillStyle = cell;
        sampleContextRef.current!.fillRect(x, y, 1, 1);
      });
    });
    worker.postMessage(sampleContextRef.current?.getImageData(0, 0, 10, 10)!);
    setLoadingState(true);
  }

  //get and print result
  //-----------------------------
  function onWorker(message: MessageEvent<ImageData>) {
    outputRefContextRef.current?.putImageData(message.data, 0, 0);
    setLoadingState(false);
  }

  return (
    <>
      {loadingState ? (
        <div className={styles.loading}>
          Loading now<div>this can take a while</div>
        </div>
      ) : (
        ""
      )}
      <canvas
        ref={sampleRef}
        className={styles.sample}
        width={10}
        height={10}
      ></canvas>
      <canvas
        ref={outputRef}
        className={styles.generator}
        height={500}
        width={500}
      ></canvas>
      <div className={styles.controls}>
        <button disabled={loadingState} onClick={onGenButton}>
          generate
        </button>
      </div>
    </>
  );
}

export default Generator;
