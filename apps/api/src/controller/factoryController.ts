import expressAsyncHandler from "express-async-handler";
import { factoryContract } from "../config/data";

export const GETpair = expressAsyncHandler(async (req, res) => {
  const { network, factoryAddress, tokenA, tokenB } = req.body;
  let pair;

  try {
    pair = await factoryContract(network, factoryAddress).getPair(
      tokenA,
      tokenB
    );
  } catch (e) {
    res.status(400).send("Error" + e);
    return;
  }

  res.status(200).send(pair);
});
