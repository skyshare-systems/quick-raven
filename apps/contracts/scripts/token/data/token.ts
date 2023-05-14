import { ethers } from "hardhat";

export const tokenData = [
  {
    name: "USDT",
    ticker: "USDT",
    supply: ethers.utils.parseEther(String(100_000_000_000)),
  },
  {
    name: "USDC",
    ticker: "USDC",
    supply: ethers.utils.parseEther(String(100_000_000_000)),
  },
  {
    name: "WETH",
    ticker: "WETH",
    supply: ethers.utils.parseEther(String(100_000_000_000)),
  },
  {
    name: "MATIC",
    ticker: "MATIC",
    supply: ethers.utils.parseEther(String(100_000_000_000)),
  },
];
