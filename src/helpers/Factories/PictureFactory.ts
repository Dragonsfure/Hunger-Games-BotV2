import { Worker } from "worker_threads";
import path from "path";

function runWorker(htmlString: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, "./worker.js"));

    worker.on("message", (message) => {
      console.log("Main thread received message:", message); // Debug log

      if (message.success) {
        const buffer = Buffer.from(message.image, "base64"); // Convert base64 string back to Buffer
        resolve(buffer);
      } else {
        reject(new Error(message.error));
      }
    });

    worker.on("error", (error) => {
      console.error("Worker error:", error); // Debug log
      reject(error);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`); // Debug log
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });

    console.log("Main thread sending message to worker"); // Debug log
    worker.postMessage(htmlString);
  });
}

// Creates Picture Buffers from an Array of Strings Representing an Image in HTML-Form.
export async function GetPictureBuffer(
  htmlStrings: string[]
): Promise<Buffer[]> {
  const bufferPromises = htmlStrings.map((htmlString) => runWorker(htmlString));
  return Promise.all(bufferPromises);
}

// Creates Picture Buffers from an Array of Strings Representing an Image in HTML-Form.
export async function GetPictureBufferSingle(
  htmlString: string
): Promise<Buffer> {
  return runWorker(htmlString);
}

// Creates Picture Buffers from an Array of Strings Representing an Image in HTML-Form.
export function GetPictureBufferSingleSync(htmlString: string): Buffer {
  throw new Error(
    "Synchronous image generation is not supported in this implementation."
  );
}

