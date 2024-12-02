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
exports.TaskMapper = void 0;
const taskEntity_1 = require("../../infrastructure/persistence/entities/taskEntity");
class TaskMapper {
    mapToDto(entity) {
        const _a = entity, { deletedAt } = _a, omitted = __rest(_a, ["deletedAt"]);
        return omitted;
    }
    mapToEntity(dto) {
        const entity = new taskEntity_1.TaskEntity();
        entity.title = dto.title || '';
        entity.description = dto.description || '';
        entity.completed = dto.completed || false;
        entity.startDate = new Date(dto.startDate || new Date());
        entity.endDate = new Date(dto.endDate || new Date());
        return entity;
    }
}
exports.TaskMapper = TaskMapper;
