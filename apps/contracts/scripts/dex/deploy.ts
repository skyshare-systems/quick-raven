import { ethers, run, upgrades } from "hardhat";

const gatewayAddress = "0x94caA85bC578C05B22BDb00E6Ae1A34878f047F7";
const operator = "0x94caA85bC578C05B22BDb00E6Ae1A34878f047F7";

async function main() {
  const Dex = await ethers.getContractFactory("CCDexAggregator");
  const dex = await upgrades.deployProxy(Dex, []);

  console.info("Deploying dex...");
  await dex.deployed();
  console.info("Dex deployed at address: ", dex.address);

  console.info("\nSetting up gateway contract...");
  await dex.setGatewayContract(
    gatewayAddress,
    "0x8bcdCAcC2eA3ef45B60Ae555Fef20B2b4EC81241"
  );
  console.info("Done!");

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
