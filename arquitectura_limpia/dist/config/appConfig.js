"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = exports.Environment = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Production"] = "production";
    Environment["Staging"] = "staging";
})(Environment || (exports.Environment = Environment = {}));
class AppConfig {
    constructor(port, env, prefix, swaggerPath, sslKeyPath, sslCertPath, chromeBin) {
        var _a, _b, _c, _d, _e, _f;
        if (port === void 0) { port = parseInt((_a = process.env.APP_PORT) !== null && _a !== void 0 ? _a : (() => { throw new Error('APP_PORT is not defined'); })()); }
        if (env === void 0) { env = (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : (() => { throw new Error('NODE_ENV is not defined'); })(); }
        if (prefix === void 0) { prefix = (_c = process.env.APP_PREFIX) !== null && _c !== void 0 ? _c : (() => { throw new Error('APP_PREFIX is not defined'); })(); }
        if (swaggerPath === void 0) { swaggerPath = (_d = process.env.SWAGGER_PATH) !== null && _d !== void 0 ? _d : (() => { throw new Error('SWAGGER_PATH is not defined'); })(); }
        if (sslKeyPath === void 0) { sslKeyPath = (_e = process.env.SSL_KEY_PATH) !== null && _e !== void 0 ? _e : (() => { throw new Error('SSL_KEY_PATH is not defined'); })(); }
        if (sslCertPath === void 0) { sslCertPath = (_f = process.env.SSL_CERT_PATH) !== null && _f !== void 0 ? _f : (() => { throw new Error('SSL_CERT_PATH is not defined'); })(); }
        if (chromeBin === void 0) { chromeBin = process.env.CHROME_BIN; }
        this.port = port;
        this.env = env;
        this.prefix = prefix;
        this.swaggerPath = swaggerPath;
        this.sslKeyPath = sslKeyPath;
        this.sslCertPath = sslCertPath;
        this.chromeBin = chromeBin;
        switch (this.env) {
            case Environment.Development:
            case Environment.Production:
            case Environment.Staging:
                break;
            default:
                throw new Error(`Invalid NODE_ENV value: ${this.env}`);
        }
    }
    get isDevelopment() {
        return this.env === Environment.Development;
    }
    get isStaging() {
        return this.env === Environment.Staging;
    }
    get isProduction() {
        return this.env === Environment.Production;
    }
}
exports.AppConfig = AppConfig;
