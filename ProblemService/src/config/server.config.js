require("dotenv").config({ quiet: true });

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
  LOG_DB_URL: process.env.LOG_DB_URL,
};
