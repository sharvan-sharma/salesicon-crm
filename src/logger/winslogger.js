const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myCustomLevels = {
  levels: {
    error: 0, 
    warn: 1, 
    info: 2, 
    http: 3,
    verbose: 4, 
    debug: 5, 
    silly: 6 
  },
  colors: {
    error: 'red', 
    warn: 'yellow', 
    info: 'cyan', 
    http: 'blue',
    verbose: 'orange', 
    debug: 'green', 
    silly: 'white' 
  }
};

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    levels:myCustomLevels,
    transports:[
        new transports.File({filename:'../../logs/combined.log',level:'info'}),
        new transports.File({filename:'../../logs/errors.log',level:'error'}),
    ],
    exitOnError:false
})

module.exports = logger