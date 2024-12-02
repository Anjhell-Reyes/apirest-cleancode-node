"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationQueryBuilder = void 0;
const inversify_1 = require("inversify");
const lodash_1 = require("lodash");
let PaginationQueryBuilder = class PaginationQueryBuilder {
    constructor() {
        this.multipleSplit = (param, res) => {
            const items = param.split(':');
            if (items.length === 2) {
                res.push(items);
            }
        };
    }
    build(request) {
        const { query } = request;
        // Determine if Express or Fastify to rebuild the original url and reduce down to protocol, host and base url
        let originalUrl;
        if (request.originalUrl) {
            originalUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
        }
        else {
            originalUrl = request.protocol + '://' + request.hostname + request.url;
        }
        const urlParts = new URL(originalUrl);
        const path = urlParts.protocol + '//' + urlParts.host + urlParts.pathname;
        const sortBy = this.parseParam(query.sortBy, this.multipleSplit);
        const filter = (0, lodash_1.mapKeys)((0, lodash_1.pickBy)(query, (param, name) => name.includes('filter.') &&
            ((0, lodash_1.isString)(param) || (Array.isArray(param) && param.every((p) => (0, lodash_1.isString)(p))))), (_param, name) => name.replace('filter.', ''));
        return {
            page: query.page ? parseInt(query.page.toString(), 10) : undefined,
            limit: query.limit ? parseInt(query.limit.toString(), 10) : undefined,
            sortBy,
            filter: Object.keys(filter).length ? filter : undefined,
            path
        };
    }
    parseParam(queryParam, parserLogic) {
        const res = [];
        if (queryParam) {
            const params = !Array.isArray(queryParam) ? [queryParam] : queryParam;
            for (const param of params) {
                if ((0, lodash_1.isString)(param)) {
                    parserLogic(param, res);
                }
            }
        }
        return res.length ? res : undefined;
    }
};
exports.PaginationQueryBuilder = PaginationQueryBuilder;
exports.PaginationQueryBuilder = PaginationQueryBuilder = __decorate([
    (0, inversify_1.injectable)()
], PaginationQueryBuilder);
