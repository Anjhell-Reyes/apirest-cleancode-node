"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPaginationConfig = void 0;
const lodash_1 = __importDefault(require("lodash"));
function buildPaginationConfig(paginateConfig) {
    const defaultPaginateConfig = {
        maxLimit: 2000,
        defaultLimit: 25,
        relativePath: true,
        sortableColumns: [],
        defaultSortBy: [['id', 'DESC']],
        filterableColumns: {
            id: true,
            createdAt: true,
            updatedAt: true,
        }
    };
    const merged = lodash_1.default.merge(defaultPaginateConfig, paginateConfig);
    merged.sortableColumns = (paginateConfig.sortableColumns || []).concat(['id', 'createdAt', 'updatedAt']);
    return merged;
}
exports.buildPaginationConfig = buildPaginationConfig;
