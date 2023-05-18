import { ethers } from "hardhat";
import { bsctestnetAddresses, tokenAddresses } from "../data/address";

async function main() {
  const [deployer] = await ethers.getSigners();

  const amount = ethers.utils.parseEther(String(1_000_000_000));

  const usdt = await ethers.getContractAt("Token", bsctestnetAddresses[0]);
  const usdc = await ethers.getContractAt("Token", bsctestnetAddresses[1]);
  const weth = await ethers.getContractAt("Token", bsctestnetAddresses[2]);
  const matic = await ethers.getContractAt("Token", bsctestnetAddresses[3]);

  console.info("Minting tokens...");
  await usdt.mint(deployer.address, amount);
  await usdc.mint(deployer.address, amount);
  await weth.mint(deployer.address, amount);
  await matic.mint(deployer.address, amount);
  console.info("Done!");
}

main();
