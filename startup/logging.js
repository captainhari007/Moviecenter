const winston = require('winston');
require('express-async-errors');
require('winston-mongodb');

module.exports = function () {
process.on('unhandledRejection', (ex) => {
throw ex;
});

    winston.exceptions.handle(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
  new winston.transports.File({ filename: 'uncaughtExceptions.log' })
);

// Configure Winston with both file and console transports
winston.configure({
  transports: [
    new winston.transports.File({ 
      filename: 'logfile.log',
      level: 'error'
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.MongoDB({
      db: process.env.MONGODB_URI || 'mongodb://localhost:27017/vidly',
      level: 'error'
    })
    
  ]
});
}