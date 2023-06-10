import { ethers } from "ethers";
import { lpTokenContract } from "../config/data";

export const lpAllowance = async (
  network: number,
  tokenAddress: string,
  owner: string,
  spender: string
) => {
  const allowance = await lpTokenContract(network, tokenAddress).allowance(
    owner,
    spender
  );

  return ethers.formatEther(allowance);
};

export const lpBalanceOf = async (
  network: number,
  tokenAddress: string,
  userAddress: string
) => {
  const balance = await lpTokenContract(network, tokenAddress).balanceOf(
    userAddress
  );

  return ethers.formatEther(balance);
};

export const lpTotalSupply = async (network: number, tokenAddress: string) => {
  const totalSupply = await lpTokenContract(
    network,
    tokenAddress
  ).totalSupply();

  return ethers.formatEther(totalSupply);
};

export const lpReserves = async (network: number, tokenAddress: string) => {
  const reserves = await lpTokenContract(network, tokenAddress).getReserves();

  return reserves;
};
