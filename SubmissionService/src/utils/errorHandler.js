const BaseError = require("../errors/BaseError");
const { StatusCodes } = require("http-status-codes");
function errorHandler(err, req, res, next) {
  if (err instanceof BaseError) {
    return res.code(err.statusCode).send({
      success: false,
      message: err.message,
      error: err.details,
      data: {},
    });
  }

  return res.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: "Something went wrong",
    error: "Not able to process your request ",
    data: {},
  });
}
module.exports = errorHandler;
