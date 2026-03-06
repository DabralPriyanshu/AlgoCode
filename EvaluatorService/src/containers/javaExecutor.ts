import Docker from "dockerode";
import createContainer from "./containerFactory.js";
// import type { TestCases } from "../types/testCases.js"
import { JAVA_IMAGE } from "../utils/constant.js";
import decodeDockerStream from "./dockerHelper.js";
import pullImage from "./pullImage.js";
import type CodeExecutorStrategy from "../types/codeExecutorStrategy.js";
import type { ExecutionResponse } from "../types/codeExecutorStrategy.js";

class JavaExecutor implements CodeExecutorStrategy {
  async execute(
    code: string,
    inputTestCase: string,
  ): Promise<ExecutionResponse> {
    const rawLogBuffer: Buffer[] = [];
    console.log("init a new java container");
    await pullImage(JAVA_IMAGE);
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
    try {
      const codeResponse: string = await this.fetchDecodedStream(
        loggerStream,
        rawLogBuffer,
      );
      return { output: codeResponse, status: "Completed" };
    } catch (error) {
      console.log(error);
      return { output: error as string, status: "Error" };
    } finally {
      await javaDockerContainer.remove();
    }
  }
  async fetchDecodedStream(
    loggerStream: NodeJS.ReadableStream,
    rawLogBuffer: Buffer[],
  ): Promise<string> {
    return await new Promise((res, rej) => {
      loggerStream.on("end", () => {
        console.log(rawLogBuffer);
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream);
        console.log(decodedStream.stdout);
        if (decodedStream.stderr) {
          rej(decodedStream.stderr);
        } else {
          res(decodedStream.stdout);
        }
      });
    });
  }
}

export default JavaExecutor;
