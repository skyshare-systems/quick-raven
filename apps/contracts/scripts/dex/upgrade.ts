import { ethers, run, upgrades } from "hardhat";

const dexAddress = "0x29Ef7732832a7a19f7a40267F73f47af6cd69F9B";

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
