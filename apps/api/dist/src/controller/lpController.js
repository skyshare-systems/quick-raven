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
const lpData_1 = require("../hooks/lpData");
exports.GETallowance = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { network, owner, spender, tokenAddress } = req.body;
    let currAllowance;
    try {
        currAllowance = yield (0, lpData_1.allowance)(network, tokenAddress, owner, spender);
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.status(200).send(lpData_1.allowance);
}));
exports.GETbalanceOf = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, tokenAddress, network } = req.body;
    let balance;
    try {
        balance = yield (0, lpData_1.balanceOf)(address, network);
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.send(balance);
}));
exports.GETtotalSupply = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, network } = req.body;
    let supply;
    try {
        supply = yield (0, lpData_1.totalSupply)(address, network);
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.send(lpData_1.totalSupply);
}));
exports.GETreserves = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { network, address } = req.body;
    let tokenReserves;
    try {
        tokenReserves = yield (0, lpData_1.reserves)(network, address);
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.status(200).send(tokenReserves);
}));
