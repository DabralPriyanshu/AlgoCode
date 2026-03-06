const mongoose = require("mongoose");
const { DB_URL, NODE_ENV } = require("./server.config");
async function connectToDB() {
  try {
    if (NODE_ENV == "development") {
      await mongoose.connect(DB_URL);
      console.log("Connected to DB!!!");
    }
  } catch (error) {
    console.log("Unable to connect to the DB server", error);
    process.exit(1);
  }
}
module.exports = connectToDB;
