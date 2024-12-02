"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const date_fns_1 = require("date-fns");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../../config/config"));
const appLogPath = path_1.default.join(__dirname, '..', '..', '..', 'storage/logger');
const filePrefix = (0, date_fns_1.format)(new Date(), 'yyyyMMdd');
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};
const level = config_1.default.app.isDevelopment ? 'debug' : 'warn';
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};
winston_1.default.addColors(colors);
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSSS' }), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message} ${info.stack ? info.stack : ''}`));
const transports = [
    new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }))
    }),
    new winston_1.default.transports.File({
        filename: `${appLogPath}/${filePrefix}-error.log`,
        level: 'error',
        options: {
            encoding: 'utf8',
            flags: 'a'
        }
    }),
    new winston_1.default.transports.File({
        filename: `${appLogPath}/${filePrefix}-all.log`,
        options: {
            encoding: 'utf8',
            flags: 'a'
        }
    })
];
const winstonLogger = winston_1.default.createLogger({
    level,
    levels,
    format: logFormat,
    transports
});
exports.default = winstonLogger;
