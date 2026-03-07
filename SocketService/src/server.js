const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  //
});

httpServer.listen(3003, () => {
  console.log(`Server started at http://localhost:3003`);
});
