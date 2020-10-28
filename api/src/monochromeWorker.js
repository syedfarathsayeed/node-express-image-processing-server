const gm = require("gm");
const { parentPort, workerData } = require("worker_threads");

module.exports = gm(workerData.source)
  .monochrome()
  .write(workerData.destination, (error) => {
    if (error) {
      throw error;
    } else {
      parentPort.postMessage({ monochrome: true });
    }
  });
