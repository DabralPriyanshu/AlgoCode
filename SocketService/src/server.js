const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const Redis = require("ioredis");
const app = express();
const httpServer = createServer(app);
const redisCache = new Redis();
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5500", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("A user connected " + socket.id);
  socket.on("setUserId", (userId) => {
    console.log(userId);
    redisCache.set(userId, socket.id);
  });
  socket.on("getConnectionId", async (userId) => {
    console.log(userId);
    const connId = await redisCache.get(userId);
    socket.emit("connectionId", connId);
  });
});
app.use(express.json());
app.post("/sendPayload", async (req, res) => {
  const { userId, payload } = req.body;
  if (!userId || !payload) {
    res.status(400).json({ message: "Invalid request" });
  }
  const socketId = await redisCache.get(userId);
  if (socketId) {
    io.to(socketId).emit("submissionPayloadResponse", payload);
    res.status(200).send("Payload sent successfully");
  } else {
    res.status(404).send("User not connected");
  }
});

httpServer.listen(3003, () => {
  console.log(`Server started at http://localhost:3003`);
});
