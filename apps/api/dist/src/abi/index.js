"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAbi = exports.factoryAbi = exports.tokenAbi = exports.lpTokenAbi = void 0;
const factory_json_1 = __importDefault(require("./factory.json"));
const lpToken_json_1 = __importDefault(require("./lpToken.json"));
const token_json_1 = __importDefault(require("./token.json"));
const router_json_1 = __importDefault(require("./router.json"));
exports.lpTokenAbi = lpToken_json_1.default.abi;
exports.tokenAbi = token_json_1.default.abi;
exports.factoryAbi = factory_json_1.default.abi;
exports.routerAbi = router_json_1.default.abi;
