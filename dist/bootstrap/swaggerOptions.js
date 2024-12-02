"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Cop16 API",
            version: "1.0.0",
            description: "A simple express library API",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Development server api version 1",
            },
        ],
    },
    apis: [
        "./src/routes/v1/*.ts"
    ],
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.default = specs;
