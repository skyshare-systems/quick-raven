import expressAsyncHandler from "express-async-handler";
import { allowance, balanceOf, totalSupply, reserves } from "../hooks/lpData";

export const GETallowance = expressAsyncHandler(async (req, res) => {
  const { network, owner, spender, tokenAddress } = req.body;
  let currAllowance: string;

  try {
    currAllowance = await allowance(network, tokenAddress, owner, spender);
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(allowance);
});

export const GETbalanceOf = expressAsyncHandler(async (req, res) => {
  const { address, tokenAddress, network } = req.body;
  let balance;

  try {
    balance = await balanceOf(address, network);
  } catch (e) {
    res.status(400).send(e);
  }

  res.send(balance);
});

export const GETtotalSupply = expressAsyncHandler(async (req, res) => {
  const { address, network } = req.body;
  let supply;

  try {
    supply = await totalSupply(address, network);
  } catch (e) {
    res.status(400).send(e);
  }

  res.send(totalSupply);
});

export const GETreserves = expressAsyncHandler(async (req, res) => {
  const { network, address } = req.body;
  let tokenReserves;

  try {
    tokenReserves = await reserves(network, address);
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(tokenReserves);
});
