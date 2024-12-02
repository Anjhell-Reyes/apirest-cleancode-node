"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.HandlebarsCompiler = void 0;
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const inversify_1 = require("inversify");
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
const handlebars_1 = __importDefault(require("handlebars"));
let HandlebarsCompiler = class HandlebarsCompiler {
    constructor() {
        this.registeredPartials = [];
    }
    compileTemplateByName(templateName, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const templatePath = path_1.default.join(__dirname, templateName);
            return yield this.compileTemplateByPath(templatePath, data, options);
        });
    }
    compileTemplateByPath(templatePath, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = yield this.readFileAsync(templatePath);
            const handlebarsTemplate = handlebars_1.default.compile(template, options || {});
            return handlebarsTemplate(data);
        });
    }
    registerPartialByPath(partialName, partialPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `${partialName}`;
            const fullPartialPath = path_1.default.join(__dirname, partialPath);
            if (this.registeredPartials.includes(key)) {
                return;
            }
            const partial = yield this.readFileAsync(fullPartialPath);
            handlebars_1.default.registerPartial(partialName, partial);
            this.registeredPartials.push(key);
        });
    }
    readFileAsync(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, promises_1.readFile)(filePath, {
                encoding: 'utf8',
                flag: 'r'
            });
        });
    }
};
exports.HandlebarsCompiler = HandlebarsCompiler;
exports.HandlebarsCompiler = HandlebarsCompiler = __decorate([
    (0, inversify_1.injectable)()
], HandlebarsCompiler);
