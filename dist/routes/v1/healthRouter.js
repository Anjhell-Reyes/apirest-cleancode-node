"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthController_1 = require("../../app/controllers/healthController");
const router = (0, express_1.Router)();
const healthController = new healthController_1.HealthController();
router.get('/health', healthController.healthCheck.bind(healthController));
router.get('/ping', healthController.ping.bind(healthController));
exports.default = router;
