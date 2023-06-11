import expressAsyncHandler from "express-async-handler";
import { tokenContract } from "../config/data";
import {
  tokenAllowance,
  test,
  tokenBalanceOf,
  tokenTotalSupply,
  tokenName,
} from "../helpers/tokenData";

export const GETallowance = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress, owner, spender } = req.body;
  let allowance;

  try {
    allowance = tokenContract(network, tokenAddress).tokenAllowance(
      owner,
      spender
    );
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(allowance);
});

export const GETbalanceOf = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress, userAddress } = req.body;
  let balance;

  try {
    balance = await tokenContract(network, tokenAddress).tokenBalanceOf(
      userAddress
    );
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(balance);
});

export const GETtotalSupply = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress } = req.body;
  let totalSupply;

  try {
    totalSupply = await tokenContract(network, tokenAddress).tokenTotalSupply();
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(totalSupply);
});

export const GETname = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress } = req.body;
  let name;

  try {
    name = await tokenContract(network, tokenAddress).tokenName();
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(name);
});

export const GETtest = expressAsyncHandler(async (req, res) => {
  const message = test();
  res.status(200).send(message);
});
