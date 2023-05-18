import { ethers, upgrades } from "hardhat";

async function main() {
  const Dex = await ethers.getContractFactory("DexAggregator");
  const dex = await upgrades.deployProxy(Dex, []);

  console.info("Deploying dex...");
  await dex.deployed();
  console.info("Dex deployed at address: ", dex.address);
}

main();
