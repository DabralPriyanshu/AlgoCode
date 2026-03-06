const { PROBLEM_SERVICE_URL } = require("../config/server.config");
const API = require("../config/axios.config");

async function fetchProblemDetails(problemId) {
  try {
    const response = await API.get(`/api/v1/problems/${problemId}`);
    console.log("Api response", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
module.exports = fetchProblemDetails;
