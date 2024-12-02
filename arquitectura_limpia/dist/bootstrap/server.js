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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const body_parser_1 = require("body-parser");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const handlebars_1 = __importDefault(require("handlebars"));
const handlebars_helpers_1 = __importDefault(require("handlebars-helpers"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("../routes");
const errorHandlerMiddleware_1 = __importDefault(require("../app/middlewares/errorHandlerMiddleware"));
const morganMiddleware_1 = __importDefault(require("../app/middlewares/morganMiddleware"));
const swaggerDocument = __importStar(require("./../../swagger.json"));
//const compression = require('compression');
// Helper formatShortDate
handlebars_1.default.registerHelper('formatShortDate', function (date) {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString('default', { month: 'short' });
    const year = dateObject.getFullYear();
    return new handlebars_1.default.SafeString(`${day} ${month} ${year}`);
});
// Helper formatNumber
handlebars_1.default.registerHelper('formatNumber', function (number) {
    return new handlebars_1.default.SafeString(number.toLocaleString());
});
class Server {
    constructor(config) {
        this.config = config;
        this.server = (0, express_1.default)();
        this.server.use(express_1.default.json({ limit: '50mb' }));
        this.server.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
    }
    getHTTPServer() {
        return this.httpServer;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.registerServices();
            return yield new Promise(resolve => {
                this.httpServer = this.server.listen(this.config.port, () => {
                    console.log(`Server is running on port ${this.config.port} in ${this.config.env} mode`);
                    console.log('Press CTRL-C to stop\n');
                });
                resolve();
            });
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                if (this.httpServer != null) {
                    this.httpServer.close(error => {
                        if (error != null) {
                            reject(error);
                        }
                    });
                }
                resolve();
            });
        });
    }
    registerServices() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.use((0, body_parser_1.json)());
            this.server.use((0, body_parser_1.urlencoded)({ extended: false }));
            this.registerHelmet();
            this.server.use((0, cors_1.default)());
            this.server.use(morganMiddleware_1.default);
            this.server.use((0, compression_1.default)());
            // zona horaria de la aplicacion en Bogota
            //process.env.TZ = 'America/Bogota'
            // Configuración y registro de Handlebars y sus helpers
            this.registerHandlebars();
            yield this.registerRoutes();
            this.server.use(errorHandlerMiddleware_1.default);
            this.registerSwagger();
        });
    }
    registerHelmet() {
        this.server.use(helmet_1.default.xssFilter());
        this.server.use(helmet_1.default.noSniff());
        this.server.use(helmet_1.default.hidePoweredBy());
        this.server.use(helmet_1.default.frameguard({ action: 'deny' }));
    }
    registerRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            const router = (0, express_1.Router)();
            this.server.use(router);
            yield (0, routes_1.registerRoutes)(router, this.config.prefix);
        });
    }
    registerSwagger() {
        this.server.use(this.config.swaggerPath, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument, { explorer: true }));
    }
    registerHandlebars() {
        // Directorio donde se encuentran las plantillas Handlebars
        this.server.set('views', path_1.default.join(__dirname, '/assets/templates/pdf'));
        this.server.engine('hbs', handlebars_1.default.create);
        this.server.set('view engine', 'hbs');
        // Registro de helpers de handlebars-helpers
        (0, handlebars_helpers_1.default)({ handlebars: handlebars_1.default });
    }
}
exports.default = Server;
