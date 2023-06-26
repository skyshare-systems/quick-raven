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
exports.GETtest = exports.GETname = exports.GETtotalSupply = exports.GETbalanceOf = exports.GETallowance = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const data_1 = require("../config/data");
const ethers_1 = require("ethers");
exports.GETallowance = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { network, tokenAddress, owner, spender } = req.body;
    let allowance;
    try {
        allowance = yield (0, data_1.tokenContract)(network, tokenAddress).allowance(owner, spender);
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.status(200).send(String(allowance));
}));
exports.GETbalanceOf = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { network, tokenAddress, userAddress } = req.body;
    let balance;
    try {
        balance = yield (0, data_1.tokenContract)(network, tokenAddress).balanceOf(userAddress);
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.status(200).send(ethers_1.ethers.formatEther(String(balance)));
}));
exports.GETtotalSupply = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { network, tokenAddress } = req.body;
    let totalSupply;
    try {
        totalSupply = yield (0, data_1.tokenContract)(network, tokenAddress).totalSupply();
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.status(200).send(ethers_1.ethers.formatEther(totalSupply));
}));
exports.GETname = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { network, tokenAddress } = req.body;
    let name;
    try {
        name = yield (0, data_1.tokenContract)(network, tokenAddress).name();
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.status(200).send(name);
}));
exports.GETtest = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = "working";
    res.status(200).send(message);
}));
