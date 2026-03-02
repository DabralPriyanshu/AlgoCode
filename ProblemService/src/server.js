const express = require("express");
const { PORT } = require("./config/server.config");
const errorHandler = require("./utils/errorHandler");
const connectToDB = require("./config/db.config");
const apiRoutes = require("./routes/index");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
app.get("/ping", (req, res) => {
  return res.json({ message: "Problem Service is alive" });
});
app.use(errorHandler);
app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
