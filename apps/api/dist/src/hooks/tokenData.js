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
exports.test = exports.name = exports.allowance = exports.balanceOf = void 0;
const ethers_1 = require("ethers");
const data_1 = require("../config/data");
const balanceOf = (address, tokenAddress, network) => __awaiter(void 0, void 0, void 0, function* () {
    const balance = yield (0, data_1.tokenContract)(network, tokenAddress).balanceOf(address);
    return ethers_1.ethers.formatEther(balance);
});
exports.balanceOf = balanceOf;
const allowance = (network, owner, spender, tokenAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const allowance = yield (0, data_1.tokenContract)(network, tokenAddress).allowance(owner, spender);
    return ethers_1.ethers.formatEther(allowance);
});
exports.allowance = allowance;
const name = (network, tokenAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const name = yield (0, data_1.tokenContract)(network, tokenAddress).name();
    return name;
});
exports.name = name;
const test = () => {
    return "working";
};
exports.test = test;
