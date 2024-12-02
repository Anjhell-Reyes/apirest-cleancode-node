"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversifyConfig_1 = __importDefault(require("./inversifyConfig"));
const symbols_1 = __importDefault(require("../../domain/types/symbols"));
class ServiceCollection {
    constructor() {
        this.symbols = symbols_1.default;
        this.container = inversifyConfig_1.default;
        console.log('IoC container initialized');
    }
    get(type) {
        return this.container.get(type);
    }
    getLogger() {
        return this.get(this.symbols.Logger);
    }
}
const IoC = new ServiceCollection();
exports.default = IoC;
