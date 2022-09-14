import { Gen } from "./WaveCollapse.js";

onmessage = (message) => {
  console.log("starting worker");
  postMessage(Gen(message.data));
  console.log("terminating worker");
};
