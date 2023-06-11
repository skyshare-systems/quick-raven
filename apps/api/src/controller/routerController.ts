import expressAsyncHandler from "express-async-handler";
import { routerContract } from "../config/data";

export const GETamountIn = expressAsyncHandler(async (req, res) => {
  const { network, routerAddress, amountOut, reserveIn, reserveOut } = req.body;
  let amountIn: string = "";

  try {
    amountIn = await routerContract(network, routerAddress).getAmountOut(
      amountOut,
      reserveIn,
      reserveOut
    );
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(amountIn);
});

export const GETamountOut = expressAsyncHandler(async (req, res) => {
  const { network, routerAddress, amountIn, reserveIn, reserveOut } = req.body;

  let amountOut: string = "";

  try {
    amountOut = await routerContract(network, routerAddress).getAmountOut(
      amountIn,
      reserveIn,
      reserveOut
    );
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(amountOut);
});
