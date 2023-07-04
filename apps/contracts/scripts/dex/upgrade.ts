import { ethers, run, upgrades } from "hardhat";

const dexAddress = "0xb23392e752fD38Aed184AAc1eD1cea13c615C24C";

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
