import { ethers } from "hardhat";
import { tokenAddresses, bsctestnetAddresses } from "./address";

export const usdtLiquidity = [
  {
    amountA: ethers.utils.parseEther(String(100_000)),
    amountB: ethers.utils.parseEther(String(100_000)),
    addressB: tokenAddresses[1],
  },
  {
    amountA: ethers.utils.parseEther(String(100_000)),
    amountB: ethers.utils.parseEther(String(100_000)),
    addressB: tokenAddresses[2],
  },
  {
    amountA: ethers.utils.parseEther(String(100_000)),
    amountB: ethers.utils.parseEther(String(100_000)),
    addressB: tokenAddresses[3],
  },
];

export const usdcLiquidity = [
  {
    amountA: ethers.utils.parseEther(String(100_000)),
    amountB: ethers.utils.parseEther(String(100_000)),
    addressB: tokenAddresses[2],
  },
  {
    amountA: ethers.utils.parseEther(String(100_000)),
    amountB: ethers.utils.parseEther(String(100_000)),
    addressB: tokenAddresses[3],
  },
];

export const wethLiquidity = [
  {
    amountA: ethers.utils.parseEther(String(100_000)),
    amountB: ethers.utils.parseEther(String(100_000)),
    addressB: tokenAddresses[3],
  },
];
