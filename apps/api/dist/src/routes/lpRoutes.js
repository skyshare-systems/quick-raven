"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lpController_1 = require("../controller/lpController");
const router = express_1.default.Router();
router.post("/allowance", lpController_1.GETallowance);
router.post("/balanceOf", lpController_1.GETbalanceOf);
router.post("/totalSupply", lpController_1.GETtotalSupply);
router.post("/reserves", lpController_1.GETreserves);
exports.default = router;
