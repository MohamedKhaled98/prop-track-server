import winston from "winston";
import 'winston-daily-rotate-file';

const { combine, timestamp, colorize, printf, json, errors } = winston.format;

const logFormat = printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}` + (info.stack ? `\n${info.stack}` : ''));

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: '%DATE%-error.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'error',
    dirname: "logs",
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json(),
        colorize(),
        errors({ stack: true }),
        logFormat,
    ),
    transports: [new winston.transports.Console(),
    ...(process.env.NODE_ENV === 'production' ? [
        fileRotateTransport
    ] : [])
    ],

});

export default logger;