"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenController_1 = require("../controller/tokenController");
const router = express_1.default.Router();
router.get("/allowance", tokenController_1.GETallowance);
router.get("/balanceOf", tokenController_1.GETbalanceOf);
router.get("/totalSupply", tokenController_1.GETtotalSupply);
router.get("/name", tokenController_1.GETname);
router.get("/test", tokenController_1.GETtest);
exports.default = router;
