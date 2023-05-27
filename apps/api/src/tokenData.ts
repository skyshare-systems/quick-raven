import { ethers } from "ethers";
import { blockchainKeys, tokenContract } from "./config/data";

export const balanceOf = async (
  address: string,
  tokenAddress: string,
  network: number
) => {
  const balance = await tokenContract(network, tokenAddress).balanceOf(address);

  return ethers.formatEther(balance);
};

export const allowance = async (
  network: number,
  owner: string,
  spender: string,
  tokenAddress: string
) => {
  const allowance = await tokenContract(network, tokenAddress).allowance(
    owner,
    spender
  );

  return ethers.formatEther(allowance);
};
