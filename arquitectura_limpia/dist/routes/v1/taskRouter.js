"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceCollection_1 = __importDefault(require("../../bootstrap/ioc/serviceCollection"));
const resource = '/tasks';
const router = (0, express_1.Router)();
const controller = serviceCollection_1.default.get(serviceCollection_1.default.symbols.TaskController);
router.get(resource, (req, res, next) => {
    controller.list(req, res, next)
        .then(() => { })
        .catch(next);
});
router.get(`${resource}/:id`, (req, res, next) => {
    controller.find(req, res, next)
        .then(() => { })
        .catch(next);
});
router.post(resource, (req, res, next) => {
    controller.create(req, res, next)
        .then(() => { })
        .catch(next);
});
router.put(`${resource}/:id`, (req, res, next) => {
    controller.update(req, res, next)
        .then(() => { })
        .catch(next);
});
router.delete(`${resource}/:id`, (req, res, next) => {
    controller.delete(req, res, next)
        .then(() => { })
        .catch(next);
});
exports.default = router;
