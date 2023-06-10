import { ethers } from "ethers";
import { tokenContract } from "../config/data";

export const tokenBalanceOf = async (
  network: number,
  tokenAddress: string,
  userAddress: string
) => {
  const balance = await tokenContract(network, tokenAddress).balanceOf(
    userAddress
  );

  return ethers.formatEther(balance);
};

export const tokenAllowance = async (
  network: number,
  tokenAddress: string,
  owner: string,
  spender: string
) => {
  const allowance = await tokenContract(network, tokenAddress).allowance(
    owner,
    spender
  );

  return ethers.formatEther(allowance);
};

export const tokenTotalSupply = async (
  network: number,
  tokenAddress: string
) => {
  const totalSupply = await tokenContract(network, tokenAddress).totalSupply();

  return ethers.formatEther(totalSupply);
};

export const tokenName = async (network: number, tokenAddress: string) => {
  const name = await tokenContract(network, tokenAddress).name();

  return name;
};

export const test = () => {
  return "working";
};
