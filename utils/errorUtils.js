const throwErrorWithStatusCode = (errorCode, message) => {
  const error = new Error(message);
  error.statusCode = errorCode;

  throw error;
};

module.exports = { throwErrorWithStatusCode };
