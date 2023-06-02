import expressAsyncHandler from "express-async-handler";
import { factoryContract } from "../config/data";
import { getPair } from "../hooks/factoryData";

export const GETpair = expressAsyncHandler(async (req, res) => {
  const { network, factoryAddress, tokenA, tokenB } = req.body;
  let pair;

  try {
    pair = await getPair(network, factoryAddress, tokenA, tokenB);
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(pair);
});
