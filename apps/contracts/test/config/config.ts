import { ethers, network } from "hardhat";
import { networkData } from "./data";
import { NetworkConfigKeys } from "./typings";

export const provider = (networkId: NetworkConfigKeys) => {
  return new ethers.providers.JsonRpcProvider(networkData[networkId].url);
};

export const wallet = new ethers.Wallet(
  "5acc566e889da617b7f8032ed5f745af8ad695ec2f5421b42b09be517067c051"
);

export const signer = (networkId: NetworkConfigKeys) => {
  return wallet.connect(provider(networkId));
};

export const dexRouter = (networkId: NetworkConfigKeys, dexName: String) => {
  if (networkId === "97") {
    if (dexName === "pcs") return networkData[networkId].dexRouter.pcs;
  }
  if (networkId === "80001") {
    if (dexName === "qs") return networkData[networkId].dexRouter.qs;
  }
};

export const tokenAddress = (
  networkId: NetworkConfigKeys,
  tokenName: String
) => {
  if (tokenName === "usdt") return networkData[networkId].tokens.usdt;
  if (tokenName === "usdc") return networkData[networkId].tokens.usdc;
  if (tokenName === "weth") return networkData[networkId].tokens.weth;
  if (tokenName === "matic") return networkData[networkId].tokens.matic;
};

/**
 * Contracts
 */
