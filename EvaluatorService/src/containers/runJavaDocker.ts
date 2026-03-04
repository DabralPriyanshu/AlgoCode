import Docker from "dockerode";
import createContainer from "./containerFactory.js";
// import type { TestCases } from "../types/testCases.js"
import { JAVA_IMAGE } from "../utils/constant.js";
import decodeDockerStream from "./dockerHelper.js";

async function runJava(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];
  console.log("init a new java container");
  const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' >Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' |java Main `; //creating a file so that we can access it later if needed and also for cpp and java we have to create a file because we have to compile it
  //   const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
  //     "python3",
  //     "-c",
  //     code,
  //     "stty -echo",
  //   ]);
  const javaDockerContainer = await createContainer(JAVA_IMAGE, [
    `/bin/sh`,
    `-c`,
    runCommand,
  ]);
  await javaDockerContainer.start();
  const loggerStream = await javaDockerContainer.logs({
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
  await javaDockerContainer.remove();
}
export default runJava;
