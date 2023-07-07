import { ethers, run, upgrades } from "hardhat";

const dexAddress = "0x066deA3C411387a5A1ee74654cE16dC88e537EBb";

async function main() {
  const Dex = await ethers.getContractFactory("CCDexAggregator");
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
