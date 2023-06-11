"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerContract = exports.lpTokenContract = exports.factoryContract = exports.tokenContract = exports.blockchainKeys = void 0;
const ethers_1 = require("ethers");
const abi_1 = require("../abi");
const blockchainKeys = (chainId) => {
    if (chainId === 80001) {
        return {
            key: "rLc98yWplzZqRlAZwg9RwiT",
            https: "https://polygon-mumbai.g.alchemy.com/v2/rLc98yWplzZqRlAZwg9RwiT-PMM0BKXi",
            wss: "wss://polygon-mumbai.g.alchemy.com/v2/rLc98yWplzZqRlAZwg9RwiT-PMM0BKXi",
        };
    }
    if (chainId === 97) {
        return {
            key: "",
            https: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            wss: "",
        };
    }
};
exports.blockchainKeys = blockchainKeys;
const tokenContract = (network, address) => {
    var _a;
    const provider = new ethers_1.ethers.JsonRpcProvider((_a = (0, exports.blockchainKeys)(network)) === null || _a === void 0 ? void 0 : _a.https);
    const contract = new ethers_1.ethers.Contract(address, abi_1.tokenAbi, provider);
    return contract;
};
exports.tokenContract = tokenContract;
const factoryContract = (network, address) => {
    var _a;
    const provider = new ethers_1.ethers.JsonRpcProvider((_a = (0, exports.blockchainKeys)(network)) === null || _a === void 0 ? void 0 : _a.https);
    const contract = new ethers_1.ethers.Contract(address, abi_1.factoryAbi, provider);
    return contract;
};
exports.factoryContract = factoryContract;
const lpTokenContract = (network, address) => {
    var _a;
    const provider = new ethers_1.ethers.JsonRpcProvider((_a = (0, exports.blockchainKeys)(network)) === null || _a === void 0 ? void 0 : _a.https);
    const contract = new ethers_1.ethers.Contract(address, abi_1.lpTokenAbi, provider);
    return contract;
};
exports.lpTokenContract = lpTokenContract;
const routerContract = (network, address) => {
    var _a;
    const provider = new ethers_1.ethers.JsonRpcProvider((_a = (0, exports.blockchainKeys)(network)) === null || _a === void 0 ? void 0 : _a.https);
    const contract = new ethers_1.ethers.Contract(address, abi_1.routerAbi, provider);
    return contract;
};
exports.routerContract = routerContract;
