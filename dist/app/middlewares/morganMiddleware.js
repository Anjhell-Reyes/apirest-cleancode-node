"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("../../config/config"));
const serviceCollection_1 = __importDefault(require("../../bootstrap/ioc/serviceCollection"));
const logger = serviceCollection_1.default.getLogger();
// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
    // Use the http severity
    write: (message) => logger.http(message)
};
// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => !config_1.default.app.isDevelopment;
// Build the morgan middleware
const morganMiddleware = (0, morgan_1.default)(
// Define message format string (this is the default one).
// The message format is made from tokens, and each token is
// defined inside the Morgan library.
// You can create your custom token to show what do you want from a request.
'[:date[iso]] :remote-addr ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :req-body :response-time ms', { stream, skip }
// Options: in this case, I overwrote the stream and the skip logic.
// See the methods above.
);
morgan_1.default.token('req-body', (req) => JSON.stringify(req.body));
exports.default = morganMiddleware;
