import Docker from "dockerode";
import createContainer from "./containerFactory.js";
// import type { TestCases } from "../types/testCases.js"
import { CPP_IMAGE } from "../utils/constant.js";
import decodeDockerStream from "./dockerHelper.js";
import pullImage from "./pullImage.js";
import type CodeExecutorStrategy from "../types/codeExecutorStrategy.js";
import type { ExecutionResponse } from "../types/codeExecutorStrategy.js";

class CppExecutor implements CodeExecutorStrategy {
  async execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string,
  ): Promise<ExecutionResponse> {
    const rawLogBuffer: Buffer[] = [];
    console.log("init a new c++ container");
    await pullImage(CPP_IMAGE);
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' >main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | stdbuf -oL -eL ./main `; //creating a file so that we can access it later if needed and also for cpp and java we have to create a file because we have to compile it
    //   const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    //     "python3",
    //     "-c",
    //     code,
    //     "stty -echo",
    //   ]);
    const cppDockerContainer = await createContainer(CPP_IMAGE, [
      `/bin/sh`,
      `-c`,
      runCommand,
    ]);
    await cppDockerContainer.start();
    const loggerStream = await cppDockerContainer.logs({
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
      if (error == "TLE") {
        await cppDockerContainer.kill();
      }
      return { output: error as string, status: "Error" };
    } finally {
      await cppDockerContainer.remove();
    }
  }
  async fetchDecodedStream(
    loggerStream: NodeJS.ReadableStream,
    rawLogBuffer: Buffer[],
  ): Promise<string> {
    return await new Promise((res, rej) => {
      const timeout = setTimeout(() => {
        console.log("Timeout called");
        rej("TLE");
      }, 2000);
      loggerStream.on("end", () => {
        clearTimeout(timeout);
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

export default CppExecutor;
