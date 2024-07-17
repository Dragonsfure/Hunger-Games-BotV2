const { parentPort } = require("worker_threads");
const nodeHtmlToImage = require("node-html-to-image");

parentPort.on("message", async (htmlString) => {
  try {
    const image = await nodeHtmlToImage({
      html: htmlString,
    });
    parentPort.postMessage({ success: true, image: image.toString("base64") }); // Send the image as a base64 string
  } catch (error) {
    parentPort.postMessage({ success: false, error: error.message });
  }
});

