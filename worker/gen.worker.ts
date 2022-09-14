import { Gen } from "../../src/utils/WaveCollapse";

onmessage = (message) => {
  console.log("starting worker");
  postMessage(Gen(message.data));
  console.log("terminating worker");
};
