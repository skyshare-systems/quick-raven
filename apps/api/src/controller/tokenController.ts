import expressAsyncHandler from "express-async-handler";
import { tokenContract } from "../config/data";

export const GETallowance = expressAsyncHandler(async (req, res) => {
  const { network, owner, spender, tokenAddress } = req.body;
  let allowance;

  try {
    allowance = await tokenContract(network, tokenAddress).allowance(
      owner,
      spender
    );
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(allowance);
});

export const GETbalanceOf = expressAsyncHandler(async (req, res) => {
  const { address, tokenAddress, network } = req.body;
  let balance;

  try {
    balance = await tokenContract(network, tokenAddress).balanceOf(address);
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(balance);
});

export const GETtotalSupply = expressAsyncHandler(async (req, res) => {
  const { address, network } = req.body;
  let totalSupply;

  try {
    totalSupply = await tokenContract(network, address).totalSupply();
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(totalSupply);
});

export const GETname = expressAsyncHandler(async (req, res) => {
  const { network, tokenAddress } = req.body;
  let name;

  try {
    name = await tokenContract(network, tokenAddress).name();
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send(name);
});
