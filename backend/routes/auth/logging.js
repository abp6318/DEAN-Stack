const winston = require('winston');

exports.logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'dean-stack-backend' },
    transports: [
        new winston.transports.File({ filename: './logs/errors.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/combined.log' }),
        new winston.transports.Console()
    ]
});