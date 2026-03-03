import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import SampleQueue from "../queues/sampleQueue.js";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/ui");

createBullBoard({
  queues: [new BullMQAdapter(SampleQueue)],
  serverAdapter,
});

export default serverAdapter;