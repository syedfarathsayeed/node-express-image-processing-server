const gm = require("gm");
const { parentPort, workerData } = require("worker_threads");

module.exports = gm(workerData.source)
  .resize(100, 100)
  .write(workerData.destination, (error) => {
    if (error) {
      throw error;
    } else {
      parentPort.postMessage({ resized: true });
    }
  });
