import { ethers } from "hardhat";
import { networkData } from "./data";

export type NetworkConfigKeys = keyof typeof networkData;
export type Provider = typeof ethers.providers.JsonRpcProvider;
