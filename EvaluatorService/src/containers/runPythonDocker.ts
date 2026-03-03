import Docker from "dockerode";
import createContainer from "./containerFactory.js";
// import type { TestCases } from "../types/testCases.js"
import { PYTHON_IMAGE } from "../utils/constant.js";
import decodeDockerStream from "./dockerHelper.js";

async function runPython(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];
  console.log("init a new python container");
  const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' >test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' |python3 test.py `; //creating a file so that we can access it later if needed and also for cpp and java we have to create a file because we have to compile it
  //   const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
  //     "python3",
  //     "-c",
  //     code,
  //     "stty -echo",
  //   ]);
  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    `/bin/sh`,
    `-c`,
    runCommand,
  ]);
  await pythonDockerContainer.start();
  const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true,
  });
  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
  });
  await new Promise((res) => {
    loggerStream.on("end", () => {
      console.log(rawLogBuffer);
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);
      console.log(decodedStream);
      console.log(decodedStream.stdout);
      res(decodedStream);
    });
  });
  await pythonDockerContainer.remove();
}
export default runPython;
