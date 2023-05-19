import { ethers, run, upgrades } from "hardhat";

const dexAddress = "0x815Ac5d36d71E191aAe34f9b5979b68Ab0d2A1F4";

async function main() {
  const Dex = await ethers.getContractFactory("DexAggregator");
  const dex = await upgrades.upgradeProxy(dexAddress, Dex);

  console.info("Upgrading dex...");
  await dex.deployed();
  console.info("Done!");

  console.info("Verify Contract...");
  try {
    await run("verify:verify", {
      address: dexAddress,
      arguments: [],
    });
  } catch (e) {
    console.info(e);
  }
}

main();
