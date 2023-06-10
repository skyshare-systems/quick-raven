import expressAsyncHandler from "express-async-handler";
import { tokenContract } from "../config/data";
import {
  tokenAllowance,
  test,
  tokenBalanceOf,
  tokenTotalSupply,
  tokenName,
} from "../hooks/tokenData";

export const GETallowance = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress, owner, spender } = req.body;
  let allowance;

  try {
    allowance = tokenAllowance(network, tokenAddress, owner, spender);
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(allowance);
});

export const GETbalanceOf = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress, userAddress } = req.body;
  let balance;

  try {
    balance = await tokenBalanceOf(network, tokenAddress, userAddress);
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(balance);
});

export const GETtotalSupply = expressAsyncHandler(async (req, res) => {
  const { network, address } = req.body;
  let totalSupply;

  try {
    totalSupply = await tokenTotalSupply(network, address);
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(totalSupply);
});

export const GETname = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress } = req.body;
  let name;

  try {
    name = await tokenName(network, tokenAddress);
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(name);
});

export const GETtest = expressAsyncHandler(async (req, res) => {
  const message = test();
  res.status(200).send(message);
});
