const winston = require("winston");

module.exports = function (err, req, res, next) {
  // Log the exception with different levels based on error type
  // Winston will now log to both console and file

  // error
  // warn
  // info
  // http
  // verbose
  // debug
  // silly

  winston.error(err.message, { 
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  res.status(500).send('Something failed.');
}