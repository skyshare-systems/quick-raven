import { ethers } from "ethers";
import { lpTokenContract } from "../config/data";

export const allowance = async (
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

export const balanceOf = async (address: string, network: number) => {
  const balance = await lpTokenContract(network, address).balanceOf(address);

  return ethers.formatEther(balance);
};

export const totalSupply = async (address: string, network: number) => {
  const totalSupply = await lpTokenContract(network, address).totalSupply();

  return ethers.formatEther(totalSupply);
};

export const reserves = async (network: number, address: string) => {
  const reserves = await lpTokenContract(network, address).getReserves();

  return reserves;
};
