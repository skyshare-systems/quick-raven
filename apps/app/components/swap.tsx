/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useAccount,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

import { useMumbaiUsdtMaticLpGetReserves } from "lib/blockchain";

import { ethers, BigNumber } from "ethers";
import useMounted from "hooks/useMounted";

import { network } from "./network";
import ModalNetworkPage from "./modal-network";
import ModalTokenPage from "./modal-token";
import ModalTokenDestinationPage from "./modal-token-destination";

import { TokenABI } from "abi";
import { ConnectNetworkSelect } from "./ConnectNetworkSelect";
import Loading from "./common/Loading";

import { ToastContainer, toast } from "react-toastify";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 0, transition: { duration: 0.2 } },
};

const SwapPage = () => {
  const { hasMounted } = useMounted();
  const { address, connector } = useAccount();
  // States
  const [isLoadingSwap, setIsLoadingSwap] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  // States for Modal Init Network and Destination Network
  const [showModal, setShowModal] = useState(false);

  const [initNetwork, setInitNetwork] = useState("");
  const [initNetworkUrl, setInitNetworkUrl] = useState("");
  const [destinationNetwork, setDestinationNetwork] = useState("");
  const [destinationNetworkUrl, setDestinationNetworkUrl] = useState("");

  // States Token Init Network
  const [showModalToken, setShowModalToken] = useState(false);
  const [tokenInitName, setTokenInitName] = useState("");
  const [tokenInitImgUrl, setTokenInitImgUrl] = useState("");
  const [tokenInitAddress, setTokenInitAddress] = useState<any>("");

  // States Token Destination Network
  const [showModalTokenDestination, setShowModalTokenDestination] =
    useState(false);
  const [tokenDestinationName, setTokenDestinationName] = useState("");
  const [tokenDestinationImgUrl, setTokenDestinationImgUrl] = useState("");
  const [tokenDestinationAddress, setTokenDestinationAddress] =
    useState<any>("");

  const [tokenLpAddress, setTokenLpAddress] = useState<any>("");

  const [labelNetwork, setLabelNetwork] = useState("");
  const [isNetworkError, setIsNetworkError] = useState(false);

  // wagmi hooks
  const { isConnected, address: account } = useAccount();
  const { chain } = useNetwork();
  const {
    isLoading: isSwitchNetwork,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();
  //
  const [tokenInputs, setTokenInputs] = useState<any>(0);
  const [minReceiveToken, setMinReceiveToken] = useState<any>(1);

  const [dynamicButtons, setDynamicButtons] = useState<string>("swap");

  const [chainAddress, setChainAddress] = useState<string>("");

  const [dexAddress, setDexAddress] = useState<any>("");

  const effectRan = useRef(false);

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
  const { config } = usePrepareContractWrite({
    address: "0x815Ac5d36d71E191aAe34f9b5979b68Ab0d2A1F4",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_dexRouter",
            type: "address",
          },
          {
            internalType: "address",
            name: "_tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "_tokenOut",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_amountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_amountOutMin",
            type: "uint256",
          },
        ],
        name: "swapToQr",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
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
    isSuccess: isSuccessSwap,
    isError: isErrorSwap,
    error: errorSwap,
  } = useContractWrite(config);

  const { data: getReserves } = useContractRead({
    address: tokenLpAddress ?? "",
    abi: [
      {
        constant: true,
        inputs: [],
        name: "getReserves",
        outputs: [
          {
            internalType: "uint112",
            name: "_reserve0",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "_reserve1",
            type: "uint112",
          },
          {
            internalType: "uint32",
            name: "_blockTimestampLast",
            type: "uint32",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getReserves",
  });

  // Dynamic Approve

  const { config: configApprove } = usePrepareContractWrite({
    address: tokenInitAddress ?? "",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "approve",
    args: [dexAddress ?? "", BigInt(String(ethers.constants.MaxUint256))], // dex aggregator address
  });

  const {
    writeAsync: approveToken,
    isSuccess: isApproveSuccess,
    isLoading: isLoadingApprove,
  } = useContractWrite(configApprove);

  // Dynamic Allowance

  const { data: checkAllowance } = useContractRead({
    address: tokenInitAddress ?? "",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "allowance",
    args: [account!, dexAddress],
  });

  // Functions
  const handleInitNetwork = (networkname: any, imgUrl: any, id: any) => {
    switchNetwork?.(id);
    setInitNetworkUrl(imgUrl);
    setInitNetwork(networkname);
  };

  const handleDestinationNetwork = (networkname: any, imgUrl: any) => {
    setDestinationNetwork(networkname);
    setDestinationNetworkUrl(imgUrl);
    setShowModal(!showModal);
  };

  const handleSelectNetwork = (networklabel: any) => {
    setLabelNetwork(networklabel);
    setShowModal(!showModal);
  };

  const handleSelectedTokenInit = (
    tokenName: any,
    imgUrl: any,
    address: any
  ) => {
    setTokenInitName(tokenName);
    setTokenInitImgUrl(imgUrl);
    setTokenInitAddress(address);
    setShowModalToken(!showModalToken);
  };

  const handleSelectedTokenDestination = (
    tokenName: any,
    imgUrl: any,
    address: any
  ) => {
    setTokenDestinationName(tokenName);
    setTokenDestinationImgUrl(imgUrl);
    setTokenDestinationAddress(address);
    setShowModalTokenDestination(!showModalTokenDestination);
  };

  const handleSwapToQr = () => {
    swapToQr?.();
  };

  useEffect(() => {
    if (isErrorSwap === true) {
      toast(errorSwap?.message);
    }
  }, [isErrorSwap]);

  useEffect(() => {
    if (isApproveSuccess) {
      setDynamicButtons("swap");
    }
  }, [isApproveSuccess]);

  useEffect(() => {
    if (isSuccessSwap == true) {
      toast("Transaction has been created");
    }
  }, [isSuccessSwap]);

  const calculateMinTokenOut = (
    tokenIn: any,
    reserveIn: any,
    reserveOut: any,
    slippage: any
  ) => {
    console.info(tokenIn);

    if (tokenInputs > 0) {
      const idealOutput =
        Number(reserveOut) -
        (Number(reserveIn) * Number(reserveOut)) /
          (Number(reserveIn) + tokenIn);

      const minTokensOut = idealOutput * (1 - slippage / 100);

      console.info(minTokensOut);
      setMinReceiveToken(minTokensOut);
    }

    if (String(tokenInputs) === "") {
      setMinReceiveToken(0);
    }
  };

  // useEffects
  useEffect(() => {
    if (destinationNetwork === initNetwork) {
      setDestinationNetwork("");
      setDestinationNetworkUrl("");
    }
  }, [destinationNetwork, initNetwork]);

  useEffect(() => {
    {
      if (isConnected) {
        network.map((data) => {
          if (chain?.name === data.networkname) {
            setInitNetwork(data.shortname);
            setInitNetworkUrl(data.imgUrl);
            // setChainAddress(data.address);
            setDexAddress(data.dexAggregatorAddress);
            setTokenLpAddress(data.lpAddress);
          } else {
            setTokenInitName("");
            setTokenInitImgUrl("");
            setTokenDestinationName("");
            setTokenDestinationImgUrl("");
            setTokenInputs("");
          }
        });
        setShowModal(false);
      }
      if (!isConnected) {
        setInitNetwork("");
        setInitNetworkUrl("");
        setDestinationNetwork("");
        setDestinationNetworkUrl("");
        setTokenInitName("");
        setTokenInitImgUrl("");
        setTokenInitAddress("");
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
    if (effectRan.current === false) {
      if (isSuccessSwap === true) {
        console.info("Ether setup complete");
        effectRan.current = true;

        // eslint-disable-next-line newline-after-var
        const sendTransact = async () => {
          console.info("Sending transaction...");
          await contract
            .connect(signer)
            .transfer(address, String(10 ** 18 * minReceiveToken));
        };
        sendTransact();

        effectRan.current = false;
      }
    }
  }, [isSuccessSwap]);

  useEffect(() => {
    if (isConnected && tokenInitAddress !== "") {
      if (tokenInputs > Number(ethers.utils.formatEther(checkAllowance ?? 0))) {
        setDynamicButtons("Approve");
      } else {
        setDynamicButtons("swap");
      }
    }
  }, [tokenInputs]);

  if (!hasMounted) {
    return null;
  }

  return (
    <section className="relative flex flex-col justify-center  pb-[3rem] pt-[7rem] items-center min-h-[100vh] lg:h-[95vh] xl:min-h-[94vh] gap-5">
      {/* Modal  */}

      {isLoading && <Loading />}

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
        labelnetwork={labelNetwork}
        initNetwork={initNetwork}
        isOpen={showModal}
        handleDestinationNetwork={handleDestinationNetwork}
        handleInitNetwork={handleInitNetwork}
        isLoading={isSwitchNetwork}
        pendingChainId={pendingChainId}
        onClose={() => setShowModal(false)}
      />

      <ModalTokenPage
        isOpen={showModalToken}
        initNetwork={initNetwork}
        onClose={() => setShowModalToken(!showModalToken)}
        chainId={chain?.id}
        handleSelectedTokenInit={handleSelectedTokenInit}
      />

      <ModalTokenDestinationPage
        isOpen={showModalTokenDestination}
        destinationNetwork={destinationNetwork}
        onClose={() => setShowModalTokenDestination(!showModalTokenDestination)}
        handleSelectedTokenDestination={handleSelectedTokenDestination}
      />
      {/* Swap  */}
      <div className="flex flex-col lg:flex-row justify-center gap-5 w-full max-w-[500px] lg:max-w-[1020px]">
        <div className="flex flex-col justify-center items-center gap-3 border-[1px] border-[#3b3b3b] bg-radial rounded-xl text-white px-[12px] py-[16px] w-full max-w-[500px]">
          <div className="flex flex-row justify-between w-full py-1">
            <h1 className="mobile-title sm:tablet-title lg:web-title grow">
              Swap
            </h1>
            <div className="flex flex-row gap-3 cursor-pointer">
              <Image
                src={"/icons/refresh-icon.svg"}
                alt={"refresh"}
                height={15}
                width={15}
              />

              <Image
                src={"/icons/settings-icon.svg"}
                alt={"refresh"}
                height={15}
                width={15}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
          </div>

          <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="flex flex-col justify-between w-full"
          >
            <motion.ul
              variants={{
                open: {
                  clipPath: "inset(0% 0% 0% 0%)",
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.3,
                    delayChildren: 0.1,
                    staggerChildren: 0.05,
                  },
                },
                closed: {
                  clipPath: "inset(10% 50% 90% 50%)",
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.3,
                    delayChildren: 0.1,
                  },
                },
              }}
              className={`duration-300 transition ${
                isOpen ? "flex flex-col" : "hidden"
              }`}
              style={{ pointerEvents: isOpen ? "auto" : "none" }}
            >
              <motion.li
                variants={itemVariants}
                className="flex flex-col justify-center bg-[#212121] border-[1px] border-[#474747] my-2 rounded-xl px-3 py-5 gap-4"
              >
                <div className="flex flex-col gap-2 xsm:flex-row">
                  <div className="flex flex-col justify-center gap-2 grow">
                    <div className="flex flex-row items-center justify-center gap-2 xsm:justify-start">
                      <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#7a7a7a]">
                        Default Pathway
                      </p>
                      <Image
                        src={"/icons/info-icon.svg"}
                        alt={"dropdown"}
                        height={12}
                        width={20}
                      />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 xsm:justify-start xsm:flex-row">
                      <button className="flex items-center gap-2 text-black mobile-subtitle sm:tablet-subtitle lg:web-subtitle bg-[#1cef5f] px-4 py-2 rounded-full ">
                        <Image
                          src={"/icons/fastest-icon.svg"}
                          alt={"dropdown"}
                          height={15}
                          width={15}
                        />
                        Fastest
                      </button>
                      <button className="flex items-center gap-2 text-white mobile-subtitle sm:tablet-subtitle lg:web-subtitle bg-[#2e2e2e] px-4 py-2 rounded-full">
                        <Image
                          src={"/icons/cheapest-icon.svg"}
                          alt={"dropdown"}
                          height={15}
                          width={15}
                        />
                        Cheapest
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 xsm:items-end">
                    <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#7a7a7a]">
                      Slippage Tolerance
                    </p>
                    <div className="flex justify-center xsm:justify-end">
                      <button className="flex items-center gap-2 text-white mobile-subtitle w-auto sm:tablet-subtitle lg:web-subtitle bg-[#2e2e2e] px-4 py-3 rounded-xl">
                        3.00%
                        <Image
                          src={"/icons/edit-icon.svg"}
                          alt={"dropdown"}
                          height={15}
                          width={15}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="border-[#474747]" />

                <div className="flex flex-wrap justify-between gap-2 xsm:flex-row">
                  <div className="flex flex-col gap-2">
                    <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#7a7a7a]">
                      Estimated Time:
                    </p>
                    <p className="text-white mobile-description sm:tablet-description lg:web-description">
                      15 minutes
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#7a7a7a]">
                      Bridge Fee:
                    </p>
                    <p className="text-white mobile-description sm:tablet-description lg:web-description">
                      2.50 USDT
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#7a7a7a]">
                      Estimated Gas Cost:
                    </p>
                    <p className="text-white mobile-description sm:tablet-description lg:web-description">
                      12.47 USDT
                    </p>
                  </div>
                </div>
              </motion.li>
            </motion.ul>
          </motion.nav>
          {/* Initial Network  */}
          <div className="flex flex-row justify-between items-center w-full py-2 px-3 rounded-full bg-[#2e2e2e] border-[1px] border-[#3b3b3b]">
            <p className="mobile-description sm:tablet-description lg:web-description grow text-white">
              Initial Network
            </p>

            {isConnected ? (
              <button
                onClick={() => handleSelectNetwork("Initial Network")}
                className={`flex flex-row items-center gap-2  bg-[#1b181c] border-2 rounded-full border-[#3b3b3b] px-3 py-2 hover:scale-105 active:scale-95 duration-300`}
              >
                {initNetwork === "" ? (
                  <p className="mobile-title py-1 sm:tablet-title lg:web-title text-[#7a7a7a]">
                    Select Network
                  </p>
                ) : (
                  <>
                    {isLoading ? (
                      "Switching Network"
                    ) : (
                      <>
                        <Image
                          src={initNetworkUrl}
                          alt={"refresh"}
                          height={25}
                          width={25}
                        />
                        <p className="mobile-title sm:tablet-title lg:web-title">
                          {initNetwork}
                        </p>
                      </>
                    )}
                  </>
                )}
              </button>
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
            <div className="flex flex-row justify-between grow gap-5 px-[1rem] border-[1px] border-[#3b3b3b] py-3 rounded-xl ">
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
              {/* Select Token Init Network*/}
              <button
                onClick={() => setShowModalToken(!showModalToken)}
                disabled={initNetwork === ""}
                className={`flex flex-row items-center gap-2  bg-[#1b181c] border-2 rounded-xl border-[#3b3b3b] px-3 py-3 
                          ${
                            initNetwork === ""
                              ? "cursor-not-allowed"
                              : "hover:brightness-125 hover:scale-105 active:scale-95 duration-300"
                          }`}
              >
                {tokenInitName === "" ? (
                  <p className="mobile-overline sm:tablet-overline lg:web-overline xsm:w-28 ">
                    Select Token
                  </p>
                ) : (
                  <>
                    {" "}
                    <Image
                      src={tokenInitImgUrl}
                      alt={"refresh"}
                      height={20}
                      width={20}
                    />
                    <p className="mobile-overline sm:mobile-h3">
                      {tokenInitName}
                    </p>
                    <Image
                      src={"/icons/dropdown-icon.svg"}
                      alt={"refresh"}
                      height={70}
                      width={70}
                    />
                  </>
                )}
              </button>
            </div>
            {/* Destination Network  */}
            <div className="flex flex-row justify-between items-center w-full py-2 px-3 rounded-full bg-[#2e2e2e] border-[1px] border-[#3b3b3b]">
              <p className="w-full sm:w-auto mobile-description sm:tablet-description lg:web-description grow text-white">
                Destination Network
              </p>

              <button
                disabled={initNetwork === ""}
                onClick={() => handleSelectNetwork("Destination Network")}
                className={`flex flex-row items-center gap-2  bg-[#1b181c] border-2 rounded-full border-[#3b3b3b] px-3 py-2 
                          ${
                            initNetwork === ""
                              ? "cursor-not-allowed"
                              : "hover:brightness-125 hover:scale-105 active:scale-95 duration-300"
                          }`}
              >
                {destinationNetwork === "" ? (
                  <p className="mobile-title py-1 sm:tablet-title lg:web-title text-[#7a7a7a]">
                    Select Network
                  </p>
                ) : (
                  <>
                    <Image
                      src={destinationNetworkUrl}
                      alt={"refresh"}
                      height={25}
                      width={25}
                    />
                    <p className="mobile-title sm:tablet-title lg:web-title">
                      {destinationNetwork}
                    </p>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-row justify-between grow gap-5 px-[1rem] border-[1px] border-[#3b3b3b] py-3 rounded-xl w-full">
            <input
              type="number"
              id="fname"
              name="fname"
              placeholder="0.00"
              value={minReceiveToken.toFixed(2)}
              className="w-full bg-transparent lg:grow"
              disabled
            />
            {/* Select Token v2 Destination Network */}
            <button
              disabled={destinationNetwork === ""}
              onClick={() =>
                setShowModalTokenDestination(!showModalTokenDestination)
              }
              className={`flex flex-row items-center gap-2 bg-[#1b181c] border-2 rounded-xl border-[#3b3b3b] 
                          px-3 py-3 ${
                            destinationNetwork === ""
                              ? "cursor-not-allowed"
                              : "hover:brightness-125 hover:scale-105 active:scale-95 duration-300"
                          } `}
            >
              {tokenDestinationName === "" ? (
                <p className="mobile-overline sm:tablet-overline lg:web-overline xsm:w-28">
                  Select Token
                </p>
              ) : (
                <>
                  {" "}
                  <Image
                    src={tokenDestinationImgUrl}
                    alt={"refresh"}
                    height={20}
                    width={20}
                  />
                  <p className="mobile-overline sm:mobile-h3">
                    {tokenDestinationName}
                  </p>
                  <Image
                    src={"/icons/dropdown-icon.svg"}
                    alt={"refresh"}
                    height={70}
                    width={70}
                  />
                </>
              )}
            </button>
          </div>
          <motion.button className="flex flex-row items-center justify-between grow border-[1px] border-[#474747] bg-[#141414] rounded-xl py-2 px-3  w-full">
            <div className="flex flex-wrap items-center gap-2 xsm:flex-row">
              {/*Fetch Selected Token 1 init network*/}
              <p className="mobile-description sm:tablet-description lg:web-description">
                1 USDT
              </p>
              <Image
                src={"/icons/equals-icon.svg"}
                alt={"dropdown"}
                height={12}
                width={12}
              />
              {/*Fetch Selected Token-2 destination network*/}
              <p className="mobile-description sm:tablet-description lg:web-description">
                1 AXS
              </p>
              {/* Equivalent */}
              <p className="mobile-description sm:tablet-description lg:web-description text-[#7a7a7a]">
                ($6.78)
              </p>
            </div>
            {/* Gas Fees  */}
            <div className="flex flex-wrap items-center justify-end gap-4 xsm:flex-row">
              <div className="flex gap-2">
                <Image
                  src={"/icons/gas-fee-icon.svg"}
                  alt={"dropdown"}
                  height={15}
                  width={15}
                />
                $12.47
              </div>

              <motion.div
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.3 }}
                style={{ originY: 0.55 }}
                className="flex"
              ></motion.div>
            </div>
          </motion.button>
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
              disabled={tokenInputs <= 0}
              className={`mobile-title sm:tablet-title lg:web-title w-full px-2 py-5 rounded-xl duration-300 
          ${
            tokenInputs > 0
              ? "hover:brightness-75 cursor-pointer bg-radial-button text-black  hover:scale-[1.02] active:scale-95 duration-300"
              : "cursor-not-allowed bg-[#2e2e2e] text-[#777a7a]"
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
