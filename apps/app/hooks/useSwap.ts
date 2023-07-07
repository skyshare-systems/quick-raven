import axios from "axios";
import { TokenABI } from "lib/abi";
import {
  useBalanceOf,
  useDestinationInit,
  useModal,
  useSelectTokenDestination,
  useSelectTokenInit,
} from "lib/stores.ts/stores";
import { useEffect, useState } from "react";
import { useNetwork, usePrepareContractWrite, useContractWrite } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { listOfToken } from "lib/json/network";

const useSwap = (account: any) => {
  const { chain } = useNetwork();
  const [minReceiveToken, setMinReceiveToken] = useState<number>(0.0);
  const [allowanceValue, setAllowanceValue] = useState<string>("");
  const [dexAggregatorAddress, setDexAggregatorAddress] = useState<any>("0x");
  const [dexRouterAddress, setDexRouterAddress] = useState<string>("0x");
  const [tokenLpAddress, setTokenLpAddress] = useState<any>("0x");
  const [approveHash, setApproveHash] = useState<`0x${string}`>();
  const [showModalTokenDestination, setShowModalTokenDestination] =
    useState(false);
  const {
    tokenName: token0Name,
    tokenAddress: tokenInitAddress,
    updateSelectedToken: updateSelectedTokenInit,
  } = useSelectTokenInit((state) => state);
  const {
    tokenName: token1Name,
    tokenAddress: token1Address,
    updateSelectedToken: updateSelectedTokenDestination,
  } = useSelectTokenDestination((state) => state);
  const { showModal: showModalToken0, updateModal } = useModal(
    (state) => state
  );
  const { address: addressDestinationInit, updateDestinationInit } =
    useDestinationInit((state) => state);
  const { balanceOfToken0, balanceOfToken1, updateBalanceOf } = useBalanceOf(
    (state) => state
  );
  const { config: configApprove } = usePrepareContractWrite({
    address: tokenInitAddress ?? "",
    abi: TokenABI,
    functionName: "approve",
    args: [
      dexAggregatorAddress ?? "",
      BigInt(String(ethers.constants.MaxUint256)),
    ],
  });
  const { writeAsync: writeToken } = useContractWrite(configApprove);

  //functions

  const selectedToken0 = async (
    tokenName: any,
    imgUrl: any,
    address: `0x${string}`,
    network: number
  ) => {
    updateSelectedTokenInit(tokenName, imgUrl, address, network);
    updateModal(false);
    await axios
      .post("https://quickraven-api.onrender.com/api/token/balanceOf", {
        network: network,
        tokenAddress: address,
        userAddress: account,
      })
      .then((response) => {
        updateBalanceOf(response.data, 0);
      })
      .catch((err) => console.log(err));
  };

  const selectedToken1 = async (
    tokenName: any,
    imgUrl: any,
    address: any,
    network: number
  ) => {
    updateSelectedTokenDestination(tokenName, imgUrl, address, network);
    setShowModalTokenDestination(!showModalTokenDestination);

    await axios
      .post("https://quickraven-api.onrender.com/api/token/balanceOf", {
        network: network,
        tokenAddress: address,
        userAddress: account,
      })
      .then((response) => {
        console.log(response.data);
        updateBalanceOf(balanceOfToken0, response.data);
      })
      .catch((err) => console.log(err));
  };

  const selectedTokenAddress = () => {
    listOfToken
      .filter((filter) => {
        return filter.tokenName === token1Name && filter.chainID === chain?.id;
      })
      .map((data) => {
        console.log(data.address + " weh");
        updateDestinationInit(data.address);
      });
  };

  const calculateMinTokenOut = (
    tokenIn: any,
    reserveIn: any,
    reserveOut: any,
    slippage: any,
    tokenInputs: any
  ) => {
    if (tokenInputs > 0) {
      const idealOutput =
        Number(reserveOut) -
        (Number(reserveIn) * Number(reserveOut)) /
          (Number(reserveIn) + tokenIn);

      const minTokensOut = idealOutput * (1 - slippage / 100);

      // console.info(minTokensOut);
      setMinReceiveToken(minTokensOut);
    } else {
      setMinReceiveToken(0.0);
    }
  };

  const approveToken = () => {
    writeToken?.()
      .then((res) => {
        console.log(res);

        setApproveHash(res.hash);
      })
      .catch((err) => {
        console.info(err);
      });
  };

  const checkAllowance = async () => {
    await axios
      .post("https://quickraven-api.onrender.com/api/token/allowance", {
        network: chain?.id,
        tokenAddress: tokenInitAddress,
        owner: account,
        spender: dexAggregatorAddress,
      })
      .then((response) => {
        // console.log(response.data + " Test");
        setAllowanceValue(response.data);
      })
      .catch((err) => {
        console.info(err);
      });
  };

  const getPairs = () => {
    const pairs = token0Name + "-" + token1Name;

    switch (pairs) {
      case "USDT-USDC":
        return (
          setTokenLpAddress("0xf98809B88c5143cd6abcBb7431CE5F9A76e53126"),
          console.log(
            "0xf98809B88c5143cd6abcBb7431CE5F9A76e53126" + " USDT-USDC Testing"
          )
        );
      case "USDC-USDT":
        return (
          setTokenLpAddress("0xf98809B88c5143cd6abcBb7431CE5F9A76e53126"),
          console.log(
            "0xf98809B88c5143cd6abcBb7431CE5F9A76e53126" + " USDC-USDT testing"
          )
        );

      case "USDT-WETH":
        return (
          setTokenLpAddress("0xF3eC1ce03b6a2EC17e90FA0340DcB8E260922D00"),
          console.log(
            "0xF3eC1ce03b6a2EC17e90FA0340DcB8E260922D00" + " USDT-WETH testing"
          )
        );
      case "WETH-USDT":
        return (
          setTokenLpAddress("0xF3eC1ce03b6a2EC17e90FA0340DcB8E260922D00"),
          console.log(
            "0xF3eC1ce03b6a2EC17e90FA0340DcB8E260922D00" + " WETH-USDT testing"
          )
        );

      case "MATIC-USDT":
        return (
          setTokenLpAddress("0x8d1D0089736a2f3A9eCAe08a356dCB337F55234b"),
          console.log(
            "0x8d1D0089736a2f3A9eCAe08a356dCB337F55234b" + " MATIC-USDT testing"
          )
        );
      case "USDT-MATIC":
        return (
          setTokenLpAddress("0x8d1D0089736a2f3A9eCAe08a356dCB337F55234b"),
          console.log(
            "0x8d1D0089736a2f3A9eCAe08a356dCB337F55234b" + " USDT-MATIC testing"
          )
        );

      case "USDC-WETH":
        return (
          setTokenLpAddress("0x0ceD130cdb3966b04B46d0E08776b71ce65230BF"),
          console.log(
            "0x0ceD130cdb3966b04B46d0E08776b71ce65230BF" + " USDC-WETH testing"
          )
        );
      case "WETH-USDC":
        return (
          setTokenLpAddress("0x0ceD130cdb3966b04B46d0E08776b71ce65230BF"),
          console.log(
            "0x0ceD130cdb3966b04B46d0E08776b71ce65230BF" + " WETH-USDC testing"
          )
        );

      case "USDC-MATIC":
        return (
          setTokenLpAddress("0x12f0E87724054057c240f39cc3466bbD9b6Ef9AF"),
          console.log(
            "0x12f0E87724054057c240f39cc3466bbD9b6Ef9AF" + " USDC-MATIC testing"
          )
        );
      case "MATIC-USDC":
        return (
          setTokenLpAddress("0x12f0E87724054057c240f39cc3466bbD9b6Ef9AF"),
          console.log(
            "0x12f0E87724054057c240f39cc3466bbD9b6Ef9AF" + " MATIC-USDC testing"
          )
        );

      case "WETH-MATIC":
        return (
          setTokenLpAddress("0x0b5249aA44039a6305597C329E2d790E0DfF6142"),
          console.log(
            "0xf98809B88c5143cd6abcBb7431CE5F9A76e53126" + " WETH-MATIC testing"
          )
        );
      case "MATIC-WETH":
        return (
          setTokenLpAddress("0x0b5249aA44039a6305597C329E2d790E0DfF6142"),
          console.log(
            "0xf98809B88c5143cd6abcBb7431CE5F9A76e53126" + " MATIC-WETH testing"
          )
        );
    }
  };

  useEffect(() => {
    if (token1Address) selectedTokenAddress();
    getPairs();
  }, [token1Address, tokenInitAddress]);

  return {
    calculateMinTokenOut,
    setMinReceiveToken,
    //function
    checkAllowance,
    setDexAggregatorAddress,
    setDexRouterAddress,
    approveToken,
    setShowModalTokenDestination,
    selectedToken0,
    selectedToken1,
    selectedTokenAddress,

    // variables
    minReceiveToken,
    allowanceValue,
    dexAggregatorAddress,
    approveHash,
    showModalTokenDestination,
    tokenLpAddress,
    dexRouterAddress,
  };
};

export default useSwap;
