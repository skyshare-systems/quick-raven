import { ethers } from "ethers";
import { lpTokenContract, routerContract } from "../config/data";

export const tokenOutPrice = async (
  network: number,
  routerAddress: string,
  lpTokenAddress: string,
  amountIn: string
) => {
  const router = routerContract(network, routerAddress);
  const lpToken = lpTokenContract(network, lpTokenAddress);
  const reserves = await lpToken.getReserves();

  console.log(reserves[0], reserves[1]);
  const amountOut = await router.getAmountOut(
    amountIn,
    reserves[0],
    reserves[1]
  );

  return ethers.formatEther(amountOut);
};

export const tokenInPrice = async (
  network: number,
  routerAddress: string,
  lpTokenAddress: string,
  amountOut: string
) => {
  const router = routerContract(network, routerAddress);
  const lpToken = lpTokenContract(network, lpTokenAddress);
  const reserves = await lpToken.getReserves();

  const amountIn = await router.getAmountIn(
    amountOut,
    reserves[0],
    reserves[1]
  );

  return ethers.formatEther(amountIn);
};
