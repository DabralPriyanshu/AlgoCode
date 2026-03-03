import express, { type Express } from "express";
import ENV from "./config/server.config.js";
import apiRoutes from "./routes/index.js";
// import addJobToSampleQueue from "./producers/sampleQueueProducer.js";
// import sampleWorker from "./workers/sampleWorker.js";
import bullBoardAdapter from "./config/bullboard.config.js";
import runPython from "./containers/runPythonDocker.js";
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
app.use("/ui", bullBoardAdapter.getRouter());
app.listen(ENV.PORT, () => {
  console.log(`Server started at http://localhost:${ENV.PORT}`);
  console.log(
    `BullBoard dashboard running on: http://localhost:${ENV.PORT}/ui`,
  );
  // sampleWorker("SampleQueue");
  // addJobToSampleQueue("SampleJob", { name: "Sanket", company: "Microsoft" }, 2);
  // addJobToSampleQueue("SampleJob", { name: "Sarthak", company: "Google" }, 1);
  const code = `x=input()
y=input()
print("Value of x  is ",x)
print("Value of y  is ",y)
`;
  const input = `100
200
`;
  runPython(code, input);
});
