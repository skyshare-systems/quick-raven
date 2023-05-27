import { ethers } from "ethers";
import { tokenAbi, factoryAbi } from "../abi";

export const blockchainKeys = (chainId: number) => {
  if (chainId === 80001) {
    return {
      key: "rLc98yWplzZqRlAZwg9RwiT",
      https:
        "https://polygon-mumbai.g.alchemy.com/v2/rLc98yWplzZqRlAZwg9RwiT-PMM0BKXi",
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

export const tokenContract = (network: number, address: string) => {
  const provider = new ethers.JsonRpcProvider(blockchainKeys(network)?.https);
  const contract = new ethers.Contract(address, tokenAbi);

  return contract;
};

export const factoryContract = (network: number, address: string) => {
  const provider = new ethers.JsonRpcProvider(blockchainKeys(network)?.https);
  const contract = new ethers.Contract(address, factoryAbi);

  return contract;
};
