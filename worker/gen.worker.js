import { Gen } from "../../src/utils/WaveCollapse.js";

onmessage = (message) => {
  console.log("starting worker");
  postMessage(Gen(message.data));
  console.log("terminating worker");
};
