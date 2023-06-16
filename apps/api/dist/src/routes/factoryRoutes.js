"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const factoryController_1 = require("../controller/factoryController");
const router = express_1.default.Router();
router.post("/", factoryController_1.GETpair);
exports.default = router;
