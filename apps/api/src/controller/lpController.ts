import expressAsyncHandler from "express-async-handler";
import { lpTokenContract, tokenContract } from "../config/data";

export const GETallowance = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress, owner, spender } = req.body;
  let currAllowance: string = "";

  try {
    currAllowance = await lpTokenContract(network, tokenAddress).allowance(
      owner,
      spender
    );
  } catch (e: any) {
    res.status(400).send("Error" + e);
    return;
  }

  res.status(200).send(currAllowance);
});

export const GETbalanceOf = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress, userAddress } = req.body;
  let balance;

  try {
    balance = await lpTokenContract(network, tokenAddress).balanceOf(
      userAddress
    );
  } catch (e: any) {
    res.status(400).send("Error" + e);
    return;
  }

  res.send(balance);
});

export const GETtotalSupply = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress } = req.body;
  let supply;

  try {
    supply = await lpTokenContract(network, tokenAddress).totalSupply();
  } catch (e: any) {
    res.status(400).send("Error" + e);
    return;
  }

  res.send(supply);
});

export const GETreserves = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress } = req.body;
  let tokenReserves;

  try {
    tokenReserves = await lpTokenContract(network, tokenAddress).reserves();
  } catch (e: any) {
    res.status(400).send("Error" + e);
    return;
  }

  res.status(200).send(tokenReserves);
});
