import { ethers } from "hardhat";
import { bsctestnetAddresses, tokenAddresses } from "../data/address";
import { usdcLiquidity, usdtLiquidity, wethLiquidity } from "../data/liquidity";

const routerAdd = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";

async function main() {
  const router = await ethers.getContractAt("IPancakeRouter01", routerAdd);
  const usdc = await ethers.getContractAt("Token", tokenAddresses[0]);
  const usdt = await ethers.getContractAt("Token", tokenAddresses[1]);
  const weth = await ethers.getContractAt("Token", tokenAddresses[2]);
  const matic = await ethers.getContractAt("Token", tokenAddresses[3]);

  console.info("Approving...");
  await usdc.approve(routerAdd, ethers.constants.MaxUint256);
  await usdt.approve(routerAdd, ethers.constants.MaxUint256);
  await weth.approve(routerAdd, ethers.constants.MaxUint256);
  await matic.approve(routerAdd, ethers.constants.MaxUint256);
  console.info("Done!");

  console.info("\nAdding Liquidity for USDT");
  for (let index = 0; index < usdtLiquidity.length; index++) {
    await router.addLiquidity(
      tokenAddresses[0],
      usdtLiquidity[index].addressB,
      usdtLiquidity[index].amountA,
      usdtLiquidity[index].amountB,
      usdtLiquidity[index].amountA,
      usdtLiquidity[index].amountB,
      "0x8bcdcacc2ea3ef45b60ae555fef20b2b4ec81241",
      1684348500
    );
  }
  console.info("Done!");

  console.info("\nAdding Liquidity for USDC");
  for (let index = 0; index < usdcLiquidity.length; index++) {
    await router.addLiquidity(
      tokenAddresses[1],
      usdcLiquidity[index].addressB,
      usdcLiquidity[index].amountA,
      usdcLiquidity[index].amountB,
      usdcLiquidity[index].amountA,
      usdcLiquidity[index].amountB,
      "0x8bcdcacc2ea3ef45b60ae555fef20b2b4ec81241",
      1684348500
    );
  }
  console.info("Done!");

  console.info("\nAdding Liquidity for WETH");
  for (let index = 0; index < wethLiquidity.length; index++) {
    await router.addLiquidity(
      tokenAddresses[2],
      wethLiquidity[index].addressB,
      wethLiquidity[index].amountA,
      wethLiquidity[index].amountB,
      wethLiquidity[index].amountA,
      wethLiquidity[index].amountB,
      "0x8bcdcacc2ea3ef45b60ae555fef20b2b4ec81241",
      1684348500
    );
  }
  console.info("Done!");
}

main();
