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
exports.registerRoutes = void 0;
const path = __importStar(require("path"));
const fs_1 = require("fs");
const serviceCollection_1 = __importDefault(require("../bootstrap/ioc/serviceCollection"));
const SEPARATOR = '.';
const MAIN_FOLDER = __dirname;
const logger = serviceCollection_1.default.getLogger();
const isFolder = (dirname) => {
    return (0, fs_1.statSync)(dirname).isDirectory();
};
const getFiles = (dirname, prefix = '') => {
    let result = [];
    (0, fs_1.readdirSync)(dirname).filter((filename) => {
        const fullFilename = `${dirname}/${filename}`;
        const cleanFilename = filename.split(SEPARATOR).slice(0, -1).join(SEPARATOR);
        const cleanFullFilename = `${dirname}/${cleanFilename}`;
        if (isFolder(fullFilename)) {
            result = [...result, ...getFiles(fullFilename, `${prefix}/${filename}`)];
        }
        else if (cleanFilename !== 'index') {
            result.push([prefix, cleanFilename, path.relative(MAIN_FOLDER, cleanFullFilename)]);
        }
        return filename;
    });
    return result;
};
function registerRoutes(router, appPrefix) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileList = getFiles(MAIN_FOLDER);
        try {
            for (const [prefix, _filename, path] of fileList) {
                const module = yield Promise.resolve(`${`./${path}`}`).then(s => __importStar(require(s)));
                router.use(appPrefix + prefix, module.default);
            }
        }
        catch (err) {
            logger.error(err);
        }
        return router;
    });
}
exports.registerRoutes = registerRoutes;
