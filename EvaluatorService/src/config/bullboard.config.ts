import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import SampleQueue from "../queues/sampleQueue.js";
import SubmissionQueue from "../queues/submissionQueue.js";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/ui");

createBullBoard({
  queues: [new BullMQAdapter(SampleQueue), new BullMQAdapter(SubmissionQueue)],
  serverAdapter,
});

export default serverAdapter;
