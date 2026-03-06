import express, { type Express } from "express";
import ENV from "./config/server.config.js";
import apiRoutes from "./routes/index.js";
// import addJobToSampleQueue from "./producers/sampleQueueProducer.js";
// import sampleWorker from "./workers/sampleWorker.js";
import bullBoardAdapter from "./config/bullboard.config.js";
import submissionWorker from "./workers/submissionWorker.js";
import { SUBMISSION_QUEUE } from "./utils/constant.js";
import addJobToSubmissionQueue from "./producers/submissionQueueProducer.js";
import runCpp from "./containers/CppExecutor.js";
// import runJava from "./containers/runJavaDocker.js";
// import runPython from "./containers/runPythonDocker.js";
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
  //   const code = `x=input()
  // y=input()
  // print("Value of x  is ",x)
  // print("Value of y  is ",y)
  // `;
  //   const input = `100
  // 200
  // `;
  //   runPython(code, input);

  // const code = `
  // import java.util.*;

  // public class Main {
  //     public static void main(String[] args) {

  //         Scanner sc = new Scanner(System.in);
  //         int input = sc.nextInt();

  //         System.out.println("Input is " + input);

  //         for (int i = 1; i <= input; i++) {
  //             System.out.println(i);
  //         }
  //     }
  // }
  // `;
  // const inputCase = `10`;
  // runJava(code, inputCase);

  const code = `
  #include<iostream>
  #include<stdio.h>
  using namespace std;
  int main()
  {
  int x;
  cin>>x;
  cout<<"Value of x is "<<x<<" ";
  cout<<endl;
  return 0;
  }

  `;
  const inputCase = `10`;
  // runCpp(code, inputCase);
  // submissionWorker(SUBMISSION_QUEUE);
  // addJobToSubmissionQueue({ "1234": { language: "JAVA", inputCase, code } });
});
