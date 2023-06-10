import expressAsyncHandler from "express-async-handler";
import { allowance, balanceOf, totalSupply, reserves } from "../hooks/lpData";

export const GETallowance = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress, owner, spender } = req.body;
  let currAllowance: string;

  try {
    currAllowance = await allowance(network, tokenAddress, owner, spender);
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(allowance);
});

export const GETbalanceOf = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress, userAddress } = req.body;
  let balance;

  try {
    balance = await balanceOf(network, tokenAddress, userAddress);
  } catch (e) {
    res.status(400).send(e);
  }

  res.send(balance);
});

export const GETtotalSupply = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress } = req.body;
  let supply;

  try {
    supply = await totalSupply(network, tokenAddress);
  } catch (e) {
    res.status(400).send(e);
  }

  res.send(totalSupply);
});

export const GETreserves = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress } = req.body;
  let tokenReserves;

  try {
    tokenReserves = await reserves(network, tokenAddress);
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(tokenReserves);
});
