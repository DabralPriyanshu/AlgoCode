const axios = require("axios");
const { PROBLEM_SERVICE_URL } = require("./server.config");
const API = axios.create({
  baseURL: PROBLEM_SERVICE_URL,
});
module.exports = API;
