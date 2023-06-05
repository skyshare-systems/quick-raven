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
exports.reserves = exports.totalSupply = exports.balanceOf = exports.allowance = void 0;
const ethers_1 = require("ethers");
const data_1 = require("../config/data");
const allowance = (network, tokenAddress, owner, spender) => __awaiter(void 0, void 0, void 0, function* () {
    const allowance = yield (0, data_1.lpTokenContract)(network, tokenAddress).allowance(owner, spender);
    return ethers_1.ethers.formatEther(allowance);
});
exports.allowance = allowance;
const balanceOf = (address, network) => __awaiter(void 0, void 0, void 0, function* () {
    const balance = yield (0, data_1.lpTokenContract)(network, address).balanceOf(address);
    return ethers_1.ethers.formatEther(balance);
});
exports.balanceOf = balanceOf;
const totalSupply = (address, network) => __awaiter(void 0, void 0, void 0, function* () {
    const totalSupply = yield (0, data_1.lpTokenContract)(network, address).totalSupply();
    return ethers_1.ethers.formatEther(totalSupply);
});
exports.totalSupply = totalSupply;
const reserves = (network, address) => __awaiter(void 0, void 0, void 0, function* () {
    const reserves = yield (0, data_1.lpTokenContract)(network, address).getReserves();
    return reserves;
});
exports.reserves = reserves;
