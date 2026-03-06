class BaseError extends Error {
  constructor(name, statusCode, description, details) {
    super(description);
    this.name = name;
    this.details = details;
    this.statusCode = statusCode;
  }
}

module.exports = BaseError;
