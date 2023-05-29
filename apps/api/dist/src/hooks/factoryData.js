"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPair = void 0;
const data_1 = require("../config/data");
const getPair = (network, factoryAddress, tokenA, tokenB) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = (0, data_1.factoryContract)(network, factoryAddress);
    const pair = yield factory.getPair(tokenA, tokenB);
    return pair;
});
exports.getPair = getPair;
