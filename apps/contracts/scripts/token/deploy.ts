import { ethers, run, upgrades } from "hardhat";
import { tokenData } from "./data/token";

async function main() {
  const Token = await ethers.getContractFactory("Token");
  // const token = await upgrades.deployProxy(Token, ["Test", "TEST"]);

  // console.info("Deploying Tokens...");
  // await token.deployed();
  for (let index = 0; index < tokenData.length; index++) {
    const token = await upgrades.deployProxy(Token, [
      tokenData[index].name,
      tokenData[index].ticker,
    ]);

    await token.deployed();
    console.info(
      `Token ${tokenData[index].name} deployed at address: `,
      token.address
    );

    await token.mint(
      "0x8bcdCAcC2eA3ef45B60Ae555Fef20B2b4EC81241",
      tokenData[index].supply
    );
  }
  // console.info("\nDone!, Deployed at address: ", token.address);
}

main();
