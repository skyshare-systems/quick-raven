import { ethers, network } from "hardhat";
import { NetworkConfigKeys, Provider } from "./config/typings";
import { dexRouter, provider, signer, tokenAddress } from "./config/config";
import { networkData } from "./config/data";
import { token } from "../typechain-types/contracts";
import { DexAggregatorABI, TokenABI } from "./config/abi/abi";

let initProvider: any;
let destProvider: any;

let networkIds: NetworkConfigKeys[];

function initializeNetwork(networkId: NetworkConfigKeys[]) {
  initProvider = provider(networkId[0]);
  destProvider = provider(networkId[1]);

  networkIds = networkId;
}

async function approveToken(
  tokenName: string,
  spender: string,
  amount: string
) {
  const token = new ethers.Contract(
    tokenAddress(networkIds[0], tokenName) ?? "",
    TokenABI,
    initProvider
  );

  console.info("\nApproving...");
  await token
    .connect(signer(networkIds[0]))
    .approve(spender, amount)
    .then((tx: any) => {
      tx.wait().then((receipt: any) => {
        if (receipt.status === 1) {
          console.info("Approved!");
          return true;
        } else {
          console.info("Approve failed!");
          return false;
        }
      });
    });
}

async function initialNetworkSwap(
  dex: string,
  tokenIn: string,
  tokenOut: string,
  amountIn: string,
  amountOut: string
) {
  const dexAggregator = new ethers.Contract(
    networkData[networkIds[0]].dexAggregator ?? "",
    DexAggregatorABI,
    initProvider
  );

  console.info("\nSwapping...");
  await dexAggregator
    .connect(signer(networkIds[0]))
    .swapToQr(
      dexRouter(networkIds[0], dex) ?? "",
      tokenIn,
      tokenOut,
      amountIn,
      amountOut
    );

  console.info("Swapped!");
}

async function main() {
  initializeNetwork(["80001", "80001"]);

  await approveToken(
    "usdt",
    "0x46d0E2C12C0F785Bb0bd4AE391eb82008B9C23D3",
    ethers.constants.MaxUint256.toString()
  ).then(async (result: any) => {
    result
      ? await initialNetworkSwap(
          "qs",
          "0xa80f9A21dD4938Ef9Cc4a5CFd97d2e27973b491b",
          "0xDe7B766c83ddd2177087d8f6F8916A3B18722669",
          "1000000000000000000",
          "1"
        )
      : console.info("Swap Failed!");
  });
}

main();
