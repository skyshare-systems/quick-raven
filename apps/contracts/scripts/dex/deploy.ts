import { ethers, run, upgrades } from "hardhat";

async function main() {
  const Dex = await ethers.getContractFactory("DexAggregator");
  const dex = await upgrades.deployProxy(Dex, []);

  console.info("Deploying dex...");
  await dex.deployed();
  console.info("Dex deployed at address: ", dex.address);

  console.info("\nVerify contract", dex.address);
  try {
    await run("verify:verify", {
      address: dex.address,
      arguments: [],
    });
  } catch (e) {
    console.info(e);
  }
  console.info("Done!");
}

main();
