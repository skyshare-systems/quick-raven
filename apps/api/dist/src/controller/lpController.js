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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GETreserves = exports.GETtotalSupply = exports.GETbalanceOf = exports.GETallowance = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const data_1 = require("../config/data");
exports.GETallowance = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { network, tokenAddress, owner, spender } = req.body;
    let currAllowance = "";
    try {
        currAllowance = yield (0, data_1.lpTokenContract)(network, tokenAddress).allowance(owner, spender);
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.status(200).send(currAllowance);
}));
exports.GETbalanceOf = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { network, tokenAddress, userAddress } = req.body;
    let balance;
    try {
        balance = yield (0, data_1.lpTokenContract)(network, tokenAddress).balanceOf(userAddress);
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.send(balance);
}));
exports.GETtotalSupply = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { network, tokenAddress } = req.body;
    let supply;
    try {
        supply = yield (0, data_1.lpTokenContract)(network, tokenAddress).totalSupply();
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.send(supply);
}));
exports.GETreserves = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { network, tokenAddress } = req.body;
    let tokenReserves;
    try {
        tokenReserves = yield (0, data_1.lpTokenContract)(network, tokenAddress).reserves();
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.status(200).send(tokenReserves);
}));
