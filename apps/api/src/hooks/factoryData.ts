import { factoryContract } from "../config/data";

export const getPair = async (
  network: number,
  factoryAddress: string,
  tokenA: string,
  tokenB: string
) => {
  const factory = factoryContract(network, factoryAddress);
  const pair = await factory.getPair(tokenA, tokenB);

  return pair;
};
