import expressAsyncHandler from "express-async-handler";
import { routerContract } from "../config/data";
import { tokenInPrice, tokenOutPrice } from "../helpers/tokenPrice";

export const GETamountIn = expressAsyncHandler(async (req, res) => {
  const { network, routerAddress, lpTokenAddress, amountOut } = req.body;
  let price: string = "";

  try {
    price = await tokenInPrice(
      network,
      routerAddress,
      lpTokenAddress,
      amountOut
    );
  } catch (e: any) {
    res.status(400).send("Error" + e);
    return;
  }

  res.status(200).send(price);
});

export const GETamountOut = expressAsyncHandler(async (req, res) => {
  const { network, routerAddress, lpTokenAddress, amountIn } = req.body;
  let price: string = "";

  try {
    price = await tokenOutPrice(
      network,
      routerAddress,
      lpTokenAddress,
      amountIn
    );
  } catch (e: any) {
    res.status(400).send("Error" + e);
  }

  res.status(200).send(price);
});
