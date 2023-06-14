/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useAccount,
  useNetwork,
  useWaitForTransaction,
  useFeeData,
  useSwitchNetwork,
} from "wagmi";
import useMounted from "../hooks/useMounted";

import { ethers, BigNumber } from "ethers";
import { network } from "./network";
import ModalNetworkPage from "./modal-network";
import ModalTokenPage from "./modal-token";
import ModalTokenDestinationPage from "./modal-token-destination";

import { TokenABI, DexAggregatorABI, LPTokenABI } from "../abi";

import { ConnectNetworkSelect } from "./common/ConnectNetworkSelect";
import Loading from "./common/Loading";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import {
  useNetworkInit,
  useNetworkDestination,
  useSelectNetwork,
  useBalanceOf,
  useSelectTokenInit,
  useModal,
} from "../lib/stores.ts/stores";
import TokenStatsPage from "./common/token-stats";
import DefaultPathwayPage from "./common/default-pathway";
import PriceBoardPage from "./common/price-board";
import SelectTokenPage from "./common/select-token";
import HeaderPage from "./common/header";
import SelectNetworkPage from "./common/select-network";

import TokenList from "./common/token-list";

const SwapPage = () => {
  const { hasMounted } = useMounted();
  const { address, connector } = useAccount();
  // States

  const [isOpen, setIsOpen] = useState(false);

  const { labelNetwork, chainID, updateSelectNetwork } = useSelectNetwork(
    (state) => state
  );

  const {
    networkName,
    imgUrl,
    updateNetwork: updateNetworkInit,
  } = useNetworkInit((state) => state);

  const {
    networkName: networkDestinationName,
    imgUrl: destinationImgUrl,
    updateNetwork: updateNetworkDestination,
  } = useNetworkDestination((state) => state);

  const { balanceOfToken0, balanceOfToken1, updateBalanceOf } = useBalanceOf(
    (state) => state
  );

  const {
    tokenName: tokenInitName,
    tokenImgUrl: tokenInitImgUrl,
    tokenAddress: tokenInitAddress,
    tokenChainID,
    showModal: showModalToken,
    updateSelectedToken: updateSelectedTokenInit,
  } = useSelectTokenInit((state) => state);

  const { showModal: showModalToken0, updateModal } = useModal(
    (state) => state
  );

  const [initChainID, setInitChainID] = useState(0);

  const [showModal, setShowModal] = useState(false);
  // States Token Destination Network
  const [showModalTokenDestination, setShowModalTokenDestination] =
    useState(false);
  const [tokenDestinationName, setTokenDestinationName] = useState("");
  const [tokenDestinationImgUrl, setTokenDestinationImgUrl] = useState("");
  const [tokenDestinationAddress, setTokenDestinationAddress] =
    useState<any>("");

  const [tokenLpAddress, setTokenLpAddress] = useState<any>("");

  // const [labelNetwork, setLabelNetwork] = useState("");
  const [isNetworkError, setIsNetworkError] = useState(false);

  const [isSuccessSwap, setIsSuccessSwap] = useState(false);

  // wagmi hooks
  const { isConnected, address: account } = useAccount();
  const { chain } = useNetwork();

  //
  const [tokenInputs, setTokenInputs] = useState<any>(0);
  const [minReceiveToken, setMinReceiveToken] = useState<any>(1);

  const [dynamicButtons, setDynamicButtons] = useState<string>("swap");

  const [chainAddress, setChainAddress] = useState<string>("");

  const [dexAddress, setDexAddress] = useState<any>("");

  const effectRan = useRef(false);

  const [hash, setHash] = useState<`0x${string}`>();

  const provider = new ethers.providers.JsonRpcProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  );
  const wallet = new ethers.Wallet(
    "5acc566e889da617b7f8032ed5f745af8ad695ec2f5421b42b09be517067c051"
  );
  // connect the wallet to the provider
  const signer = wallet.connect(provider);
  const contractAddress = "0x44fDA5d55Cd5bFD262DcF0b90F2F105211131d18";
  const abi = TokenABI;
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const token0 =
    String(tokenInputs) === ""
      ? ethers.utils.parseEther("1")
      : ethers.utils.parseEther(tokenInputs.toString());

  // Dynamic SwapToQr
  const {
    config,
    isError: isSwapError,
    error,
  } = usePrepareContractWrite({
    address: "0x815Ac5d36d71E191aAe34f9b5979b68Ab0d2A1F4",
    abi: DexAggregatorABI,
    functionName: "swapToQr",
    args: [
      "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", // dex router address
      tokenInitAddress, // token init address MATIC
      "0xa80f9A21dD4938Ef9Cc4a5CFd97d2e27973b491b", // token destination address USDT
      BigInt(token0.toString()),
      BigInt(
        tokenInputs > 0
          ? String(ethers.utils.parseEther(String(1)))
          : String(ethers.utils.parseEther(String(1)))
      ),
    ],
  });

  const {
    writeAsync: swapToQr,
    isLoading,
    isError: isErrorSwap,
    error: errorSwap,
  } = useContractWrite(config);

  const { data: getReserves } = useContractRead({
    address: tokenLpAddress ?? "",
    abi: LPTokenABI,
    functionName: "getReserves",
  });

  // Dynamic Approve

  const { config: configApprove } = usePrepareContractWrite({
    address: tokenInitAddress ?? "",
    abi: TokenABI,
    functionName: "approve",
    args: [dexAddress ?? "", BigInt(String(ethers.constants.MaxUint256))], // dex aggregator address
  });

  const {
    writeAsync: approveToken,
    isSuccess: isApproveSuccess,
    isLoading: isLoadingApprove,
  } = useContractWrite(configApprove);

  const { data: gasfee, isLoading: isLoadingGasFee } = useFeeData({
    watch: true,
  });

  const handleSelectedTokenInit = async (
    tokenName: any,
    imgUrl: any,
    address: `0x${string}`,
    network: number
  ) => {
    updateSelectedTokenInit(tokenName, imgUrl, address, network, false);
    updateModal(false);

    await axios
      .post("https://quickraven-api.onrender.com/api/token/balanceOf", {
        network: network,
        tokenAddress: address,
        userAddress: account,
      })
      .then((response) => {
        updateBalanceOf(response.data, 0);
      });
  };

  const handleSelectedTokenDestination = async (
    tokenName: any,
    imgUrl: any,
    address: any,
    network: number
  ) => {
    setTokenDestinationName(tokenName);
    setTokenDestinationImgUrl(imgUrl);
    setTokenDestinationAddress(address);
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
      });
  };

  const { isSuccess: isSwapSuccess, isLoading: isLoadingTransaction } =
    useWaitForTransaction({
      hash: hash,
    });

  const handleSwapToQr = () => {
    swapToQr?.().then((res) => {
      console.log(res);
      toast("Transaction has been created");
      setHash(res.hash);
    });
  };

  const handleApproveToken = () => {
    approveToken?.().then((res) => {
      console.log(res);
      setHash(res.hash);
    });
  };

  const checkAllowance = async () =>
    // network: number,
    // tokenAddress: string,
    // spenderAddress: string
    {
      await axios
        .post("https://quickraven-api.onrender.com/api/token/allowance", {
          network: chain?.id,
          tokenAddress: "0xDe7B766c83ddd2177087d8f6F8916A3B18722669",
          owner: account,
          spender: "0x815Ac5d36d71E191aAe34f9b5979b68Ab0d2A1F4",
        })
        .then((response) => {
          console.log(response.data + " Test");
        });
    };

  // useEffect(() => {
  //   if (isErrorSwap === true) {
  //     toast(errorSwap?.message);
  //   }
  // }, [isErrorSwap]);

  useEffect(() => {
    if (isApproveSuccess) {
      setDynamicButtons("swap");
    }
  }, [isApproveSuccess]);

  // useEffect(() => {
  //   if (isSuccessSwap == true) {
  //     toast("Transaction has been created");
  //   }
  // }, [isSuccessSwap]);

  const calculateMinTokenOut = (
    tokenIn: any,
    reserveIn: any,
    reserveOut: any,
    slippage: any
  ) => {
    // console.info(tokenIn);

    if (tokenInputs > 0) {
      const idealOutput =
        Number(reserveOut) -
        (Number(reserveIn) * Number(reserveOut)) /
          (Number(reserveIn) + tokenIn);

      const minTokensOut = idealOutput * (1 - slippage / 100);

      // console.info(minTokensOut);
      setMinReceiveToken(minTokensOut);
    }

    if (String(tokenInputs) === "") {
      setMinReceiveToken(0);
    }
  };

  useEffect(() => {
    {
      if (isConnected) {
        network.map((data) => {
          if (chain?.name === data.networkname) {
            updateNetworkInit(data.shortname, data.imgUrl);
            // setInitNetwork(data.shortname);
            // setInitNetworkUrl(data.imgUrl);
            // setChainAddress(data.address);
            setDexAddress(data.dexAggregatorAddress);
            setTokenLpAddress(data.lpAddress);
            checkAllowance();
            // checkAllowance(data.chainID,);
          } else {
            updateNetworkDestination("", "");
            updateSelectedTokenInit("", "", tokenInitAddress, 0, false);

            setTokenDestinationName("");
            setTokenDestinationImgUrl("");
            setTokenInputs("");
          }
        });
        updateSelectNetwork("", Number(chain?.id), false);
      }
      if (!isConnected) {
        updateNetworkInit("", "");
        updateNetworkDestination("", "");
        updateSelectedTokenInit("", "", "0x", 0, false);
        setTokenDestinationImgUrl("");
        setTokenDestinationName("");
      }
    }
  }, [chain?.id, isConnected]);

  useEffect(() => {
    let reservezero;
    let reserveone;

    try {
      reservezero = ethers.utils.formatEther(BigNumber.from(getReserves?.[0]));

      reserveone = ethers.utils.formatEther(BigNumber.from(getReserves?.[1]));
    } catch (e) {
      console.info(e);
    }

    if (tokenDestinationName !== "") {
      calculateMinTokenOut(
        Number(tokenInputs),
        Number(reservezero),
        Number(reserveone),
        3
      );
    }
  }, [calculateMinTokenOut, getReserves, tokenInputs]);

  useEffect(() => {
    console.log(effectRan.current);
    if (isSwapSuccess) {
      setDynamicButtons("swap");
    }
    if (effectRan.current === false) {
      if (isSwapSuccess === true) {
        console.info("Ether setup complete");
        effectRan.current = true;

        // eslint-disable-next-line newline-after-var
        const sendTransact = async () => {
          console.info("Sending transaction...");
          await contract
            .connect(signer)
            .transfer(address, String(10 ** 18 * minReceiveToken));
        };
        sendTransact().then(() => {
          toast("Success Transaction");
        });

        effectRan.current = false;
      }
    }
  }, [isSwapSuccess]);

  useEffect(() => {
    // console.log(ethers.utils.formatEther(String(checkAllowance)));
    const allowance = Number(checkAllowance);
    console.log(isSwapSuccess);
    if (isConnected) {
      console.log(allowance);
      if (tokenInputs > allowance && isSwapSuccess === false) {
        setDynamicButtons("Approve");
      } else {
        setDynamicButtons("swap");
      }
    }
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <section className="relative flex flex-col justify-center  pb-[3rem] pt-[7rem] items-center min-h-[100vh] lg:h-[95vh] xl:min-h-[94vh] gap-5">
      {isLoadingTransaction && <Loading />}

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        theme="dark"
      />

      <ModalNetworkPage
        isOpen={showModal}
        onClose={() => setShowModal(!showModal)}
      />

      <TokenList
        isOpen={showModalToken0}
        labelNetwork={"Initial Network"}
        chainID={chain?.id}
        handleSelectToken={handleSelectedTokenInit}
        onClose={() => updateModal(false)}
      />

      <TokenList
        isOpen={showModalTokenDestination}
        labelNetwork={"Destination Network"}
        chainID={chainID}
        handleSelectToken={handleSelectedTokenDestination}
        onClose={() => setShowModalTokenDestination(!showModalTokenDestination)}
      />

      {/* <ModalTokenDestinationPage
        isOpen={showModalTokenDestination}
        destinationNetwork={networkDestinationName}
        onClose={() => setShowModalTokenDestination(!showModalTokenDestination)}
        handleSelectedTokenDestination={handleSelectedTokenDestination}
      /> */}

      <div className="flex flex-col lg:flex-row justify-center gap-5 w-full max-w-[500px] lg:max-w-[1020px]">
        <div className="flex flex-col justify-center items-center gap-3 border-[1px] border-[#3b3b3b] bg-radial rounded-xl text-white px-[12px] py-[16px] w-full max-w-[500px]">
          <HeaderPage isOpen={() => setIsOpen(!isOpen)} headerName={"Swap"} />
          <DefaultPathwayPage isOpen={isOpen} />

          <div className="flex flex-row justify-between items-center w-full py-4 px-4 xsm:px-6 rounded-full bg-[#232323]/10 border-[1px] border-[#3b3b3b]">
            <p className="mobile-description sm:tablet-description lg:web-description grow text-white">
              Initial Network
            </p>
            {chainID} {labelNetwork}
            {isConnected ? (
              <SelectNetworkPage
                networkName0={networkName}
                networkName1={networkName}
                imgUrl={imgUrl}
                chainID={chainID}
                labelNetwork={"Initial Network"}
                isOpen={() => setShowModal(true)}
              />
            ) : (
              <ConnectNetworkSelect />
            )}
          </div>

          <div className="relative flex flex-col w-full gap-3">
            <div className="hidden cursor-pointer center-absolute">
              <Image
                src={"/icons/switch-icon.svg"}
                alt={"refresh"}
                height={50}
                width={50}
              />
            </div>
            <div className="flex flex-col border-[1px] border-[#3b3b3b] px-[1rem] py-3 rounded-xl gap-2">
              <div className="flex flex-row justify-between grow gap-2">
                <input
                  type="number"
                  disabled={tokenInitName === ""}
                  id="tokenvalue"
                  name="tokenvalue"
                  placeholder="0.00"
                  className={`w-full bg-transparent lg:grow ${
                    tokenInitName === "" ? "cursor-not-allowed" : "cursor-text"
                  }`}
                  onChange={(e) => setTokenInputs(e.target.value)}
                  value={tokenInputs}
                />

                <button
                  onClick={() => setTokenInputs(balanceOfToken0)}
                  className={`flex justify-center items-center text-[#1cacef] bg-[#1c3843] px-3 my-2 rounded-lg uppercase mobile-title sm:tablet-title md:web-title hover:opacity-60 duration-300`}
                >
                  Max
                </button>

                <SelectTokenPage
                  networkName={networkName}
                  isOpen={() => updateModal(!showModalToken0)}
                  tokenName={tokenInitName}
                  tokenImgUrl={tokenInitImgUrl}
                  labelNetwork="Initial Network"
                  chainID={chainID}
                />
              </div>
              <TokenStatsPage
                convertedValue={123}
                balance={parseFloat(balanceOfToken0.toFixed(6))}
                tokenName={tokenInitName}
              />
            </div>
            {/* Destination Network  */}
            <div className="flex flex-row justify-between items-center w-full py-4 px-4 xsm:px-6 rounded-full bg-[#232323]/10 border-[1px] border-[#3b3b3b]">
              <p className="w-full sm:w-auto mobile-description sm:tablet-description lg:web-description grow text-white">
                Destination Network
              </p>

              <SelectNetworkPage
                imgUrl={destinationImgUrl}
                labelNetwork={"Destination Network"}
                networkName0={networkName}
                chainID={chainID}
                networkName1={networkDestinationName}
                isOpen={() => setShowModal(true)}
              />
            </div>
          </div>
          <div className="flex flex-col border-[1px] border-[#3b3b3b] px-[1rem] py-3 rounded-xl gap-2 w-full">
            <div className="flex flex-row justify-between gap-2">
              <input
                type="number"
                id="fname"
                name="fname"
                placeholder="0.00"
                value={minReceiveToken.toFixed(2)}
                className="w-full bg-transparent lg:grow"
                disabled
              />

              <SelectTokenPage
                networkName={networkDestinationName}
                isOpen={() =>
                  setShowModalTokenDestination(!showModalTokenDestination)
                }
                tokenName={tokenDestinationName}
                tokenImgUrl={tokenDestinationImgUrl}
                chainID={chainID}
                labelNetwork="Destination Network"
              />
            </div>
            <TokenStatsPage
              convertedValue={123}
              balance={parseFloat(balanceOfToken1.toFixed(6))}
              tokenName={tokenDestinationName}
            />
          </div>

          <PriceBoardPage
            token0Name={tokenInitName}
            token0Value={
              tokenInputs === "" ? "0.00" : parseFloat(tokenInputs).toFixed(2)
            }
            token1Name={tokenDestinationName}
            token1Value={minReceiveToken.toFixed(2)}
            gasfees={gasfee?.gasPrice?.toString() ?? 0.0}
          />

          {isNetworkError && (
            <div className="px-[1rem] py-[13px] flex lg:hidden flex-row justify-center items-center bg-[#534506] rounded-xl gap-5">
              <Image
                src={"/icons/warning-icon.svg"}
                alt={"dropdown"}
                height={35}
                width={35}
              />
              <p className="mobile-overline sm:tablet-overline lg:web-overline grow">
                Polygon Network is currently having a heavy network traffic.
                Transactions may be delayed.
              </p>
            </div>
          )}

          {dynamicButtons === "Approve" ? (
            <button
              disabled={isLoadingApprove}
              className={`mobile-title sm:tablet-title lg:web-title w-full ${
                isLoadingApprove
                  ? "bg-[#2e2e2e] cursor-not-allowed text-white"
                  : "bg-[#1CACEF] hover:scale-[1.02] active:scale-95"
              }  text-black px-2 py-5 rounded-xl duration-300`}
              onClick={approveToken}
            >
              Approve
            </button>
          ) : (
            <button
              onClick={() => handleSwapToQr()}
              disabled={isSwapError}
              className={`mobile-title sm:tablet-title lg:web-title w-full px-2 py-5 rounded-xl duration-300 
          ${
            isSwapError
              ? "cursor-not-allowed bg-[#2e2e2e] text-[#777a7a]"
              : "hover:brightness-75 cursor-pointer bg-radial-button text-black  hover:scale-[1.02] active:scale-95 duration-300"
          }`}
            >
              Swap Now
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SwapPage;
