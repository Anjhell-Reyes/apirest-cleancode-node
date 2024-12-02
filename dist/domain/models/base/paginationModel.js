"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationResultModel = void 0;
class PaginationResultModel {
    constructor(data, meta, links) {
        this.data = data;
        this.meta = meta;
        this.links = links;
    }
    mapToPaginationBase() {
        const _a = this, { data } = _a, paginationBase = __rest(_a, ["data"]);
        return paginationBase;
    }
}
exports.PaginationResultModel = PaginationResultModel;
