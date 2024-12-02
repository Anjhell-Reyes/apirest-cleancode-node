"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessConfig = void 0;
class BusinessConfig {
    constructor() {
        var _a;
        const clientNitsStr = (_a = process.env.BUSINESS_CLIENT_NITS_ARRAY) !== null && _a !== void 0 ? _a : (() => { throw new Error('BUSINESS_CLIENT_NITS_ARRAY'); })();
        this.clientNits = JSON.parse(clientNitsStr);
    }
}
exports.BusinessConfig = BusinessConfig;
