import { bsctestnetAddresses, tokenAddresses } from "./data/address";
import { run } from "hardhat";
import { tokenData } from "./data/token";

async function main() {
  console.info("Verify Contracts...");

  for (let index = 0; index < bsctestnetAddresses.length; index++) {
    try {
      console.info(`Verifying ${tokenData[index].name} contract`);
      await run("verify:verify", {
        address: bsctestnetAddresses[index],
        arguments: [tokenData[index].name, tokenData[index].ticker],
      });
    } catch (e) {
      console.info(e);
    }
  }

  console.info("Done!");
}

main();
