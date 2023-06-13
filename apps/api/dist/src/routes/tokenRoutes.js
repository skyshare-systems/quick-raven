"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenController_1 = require("../controller/tokenController");
const router = express_1.default.Router();
router.post("/allowance", tokenController_1.GETallowance);
router.post("/balanceOf", tokenController_1.GETbalanceOf);
router.post("/totalSupply", tokenController_1.GETtotalSupply);
router.post("/name", tokenController_1.GETname);
router.post("/test", tokenController_1.GETtest);
exports.default = router;
