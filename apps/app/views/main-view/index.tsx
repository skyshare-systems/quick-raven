"use client";
import ContainerWrapper from "components/common/container-wrapper";
import DefaultPathwayPage from "components/common/default-pathway";
import ModalNetworkPage from "components/common/modal-network";
import { ConnectNetworkSelect } from "components/common/network-select";
import SelectNetworkPage from "components/common/select-network";
import TitlePage from "components/common/title";
import useMounted from "hooks/useMounted";
import { listOfToken, network } from "lib/json/network";
import React, { useEffect, useState } from "react";
import shortenName from "utils/limit-text";
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
  useContractWrite,
  useContractRead,
} from "wagmi";
import {
  useNetworkInit,
  useSelectTokenInit,
  useSelectTokenDestination,
  useModal,
  useNetworkDestination,
  useLabelNetwork,
  useBalanceOf,
  useDestinationInit,
} from "lib/stores.ts/stores";
import Image from "next/image";
import SelectTokenPage from "components/common/select-token";
import ListOfToken from "components/common/list-of-token";
import TokenStatsPage from "components/common/token-stats";
import PriceBoardPage from "components/common/price-board";
import axios from "axios";
import { ethers, BigNumber } from "ethers";
import {
  CCDexAggregatorABI,
  DexAggregatorABI,
  LPTokenABI,
  TokenABI,
} from "lib/abi";
import { ConnectWallet } from "components/common/connect-wallet";
import { ConnectWalletSwap } from "components/common/connect-wallet-swap";
import { Notification } from "ui/components";

const SwapPage = () => {
  const { isConnected, address: account } = useAccount();
  const { chain } = useNetwork();
  const { hasMounted } = useMounted();
  const { isSuccess } = useSwitchNetwork();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [dynamicButtons, setDynamicButtons] = useState<string>("swap");
  const [showModalTokenDestination, setShowModalTokenDestination] =
    useState(false);
  const { showModal: showModalToken0, updateModal } = useModal(
    (state) => state
  );

  const [tokenInputs, setTokenInputs] = useState<number>(0.0);
  const [minReceiveToken, setMinReceiveToken] = useState<number>(0);

  const [dexRouterAddress, setDexRouterAddress] = useState<string>("");
  const [dexAggregatorAddress, setDexAggregatorAddress] = useState<any>("");
  const [tokenLpAddress, setTokenLpAddress] = useState<any>("");

  const [allowanceValue, setAllowanceValue] = useState<string>("");
  const [approveHash, setApproveHash] = useState<`0x${string}`>();
  const [hash, setHash] = useState<`0x${string}`>();

  const { chainID } = useLabelNetwork((state) => state);

  const {
    networkName,
    imgUrl,
    updateNetwork: updateNetworkInit,
  } = useNetworkInit((state) => state);

  const {
    tokenName: tokenInitName,
    tokenImgUrl: tokenInitImgUrl,
    tokenAddress: tokenInitAddress,
    updateSelectedToken: updateSelectedTokenInit,
  } = useSelectTokenInit((state) => state);

  const {
    tokenName: tokenDestinationName,
    tokenImgUrl: tokenDestinationImgUrl,
    tokenAddress: tokenDestinationAddress,
    tokenChainID: chainIdDestination,
    updateSelectedToken: updateSelectedTokenDestination,
  } = useSelectTokenDestination((state) => state);

  const {
    networkName: networkDestinationName,
    imgUrl: destinationImgUrl,
    jsonRpcUrl: jsonRpcUrlDestination,
    updateNetwork: updateNetworkDestination,
  } = useNetworkDestination((state) => state);

  const { address: addressDestinationInit, updateDestinationInit } =
    useDestinationInit((state) => state);

  const { balanceOfToken0, balanceOfToken1, updateBalanceOf } = useBalanceOf(
    (state) => state
  );

  // const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrlDestination);
  // const wallet = new ethers.Wallet(
  //   "5acc566e889da617b7f8032ed5f745af8ad695ec2f5421b42b09be517067c051"
  // );
  // // connect the wallet to the provider
  // const signer = wallet.connect(provider);
  // const abi = TokenABI;
  // const contract = new ethers.Contract(tokenDestinationAddress, abi, provider);

  const { isSuccess: isApprove, isLoading: isLoadingApprove } =
    useWaitForTransaction({
      hash: approveHash,
    });

  const { isSuccess: isSwapSuccess, isLoading: isLoadingTransaction } =
    useWaitForTransaction({
      hash: hash,
    });

  // Dynamic SwapToQr

  const token0 =
    tokenInputs > 0
      ? ethers.utils.parseEther("1")
      : ethers.utils.parseEther(tokenInputs.toString());

  // Config

  const { config, isError: isConfigSwapError } = usePrepareContractWrite({
    address: dexAggregatorAddress ?? "",
    abi: CCDexAggregatorABI,
    functionName: "swapToQr",
    args: [
      chainIdDestination, // chain id destination
      "0x00000000000f4240000000000000000000000000000f42400000000000000000000000000000000000000000000000000000",
      [
        dexRouterAddress,
        "0x0000000000000000000000000000000000000000", // dex router address
        tokenInitAddress, // token init address MATIC
        addressDestinationInit, // token destination address USDT
        BigInt(token0.toString()),
        BigInt(
          tokenInputs > 0
            ? String(ethers.utils.parseEther(String(0)))
            : String(ethers.utils.parseEther(String(0)))
        ),
        account,
      ],
    ],
  });
  const { config: configApprove } = usePrepareContractWrite({
    address: tokenInitAddress ?? "",
    abi: TokenABI,
    functionName: "approve",
    args: [
      dexAggregatorAddress ?? "",
      BigInt(String(ethers.constants.MaxUint256)),
    ],
  });
  const { data: getReserves } = useContractRead({
    address: tokenLpAddress ?? "",
    abi: LPTokenABI,
    functionName: "getReserves",
  });

  //functions
  const { writeAsync: swapToQr } = useContractWrite(config);
  const { writeAsync: approveToken } = useContractWrite(configApprove);

  const handleSwapToQr = () => {
    swapToQr?.()
      .then((res) => {
        console.log(res);
        setHash(res.hash);
      })
      .catch((err) => {
        console.info(err);
      });
  };

  const handleApproveToken = () => {
    approveToken?.()
      .then((res) => {
        console.log(res);

        setApproveHash(res.hash);
      })
      .catch((err) => {
        console.info(err);
      });
  };

  const handleSelectedTokenInit = async (
    tokenName: any,
    imgUrl: any,
    address: `0x${string}`,
    network: number
  ) => {
    updateSelectedTokenInit(tokenName, imgUrl, address, network);
    updateModal(false);
    // setIsFetchBalance(false);
    await axios
      .post("https://quickraven-api.onrender.com/api/token/balanceOf", {
        network: network,
        tokenAddress: address,
        userAddress: account,
      })
      .then((response) => {
        updateBalanceOf(response.data, 0);
        // setIsFetchBalance(true);
      });
  };

  const handleSelectedTokenDestination = async (
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
      });
  };

  function handleSelectTokenAddress() {
    console.log(tokenDestinationName + " Testing desName");
    listOfToken
      .filter((filter) => {
        return (
          filter.tokenName === tokenDestinationName &&
          filter.chainID === chain?.id
        );
      })
      .map((data) => {
        console.log("Get Testing");
        updateDestinationInit(data.address);
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateMinTokenOut = (
    tokenIn: any,
    reserveIn: any,
    reserveOut: any,
    slippage: any
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
      setMinReceiveToken(0);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkAllowance = async () => {
    await axios
      .post("https://quickraven-api.onrender.com/api/token/allowance", {
        network: chain?.id,
        tokenAddress: tokenInitAddress,
        owner: account,
        spender: dexAggregatorAddress,
      })
      .then((response) => {
        console.log(response.data + " Test");
        setAllowanceValue(response.data);
      });
  };

  // const onSubmit = (e) => {
  //   e.target.reset();
  // };

  //load

  useEffect(() => {
    network.map((data) => {
      if (chain?.name === data.networkname && isConnected) {
        updateNetworkInit(data.shortname, data.imgUrl, jsonRpcUrlDestination);
        setDexAggregatorAddress(data.dexAggregatorAddress);
        setDexRouterAddress(data.dexRouterAddress["uniswap"]);
        setTokenLpAddress(data.lpAddress);
        document.documentElement.style.setProperty(
          "--borderUp",
          data.highColor
        );
        document.documentElement.style.setProperty("--top", data.upperColor);
        document.documentElement.style.setProperty("--solid", data.solidColor);
      } else {
        updateNetworkDestination("", "", "");
        updateSelectedTokenInit("", "", "0x", 0);
        updateSelectedTokenDestination("", "", "0x", 0);
        updateBalanceOf(0, 0);
        setTokenInputs(0.0);
        setMinReceiveToken(0);
        updateDestinationInit("");
      }
      if (!isConnected) {
        updateNetworkInit("", "", "");
        updateSelectedTokenInit("", "", "0x", 0);
        updateDestinationInit("");
        updateSelectedTokenDestination("", "", "0x", 0);
        updateBalanceOf(0, 0);
        setTokenInputs(0.0);
        updateNetworkDestination("", "", "");
        document.documentElement.style.setProperty(
          "--top",
          "rgba(84, 84, 84, 0.24) 0%, rgba(84, 84, 84, 0) 100%"
        );
        document.documentElement.style.setProperty(
          "--borderUp",
          "rgba(84, 84, 84, 1) 0%, rgba(84, 84, 84, 0) 100%"
        );
        document.documentElement.style.setProperty(
          "--borderDown",
          "rgba(84, 84, 84, 1) 0%, rgba(84, 84, 84, 0) 100%"
        );
        document.documentElement.style.setProperty(
          "--bottom",
          "rgba(84, 84, 84, 0.12) 0%, rgba(84, 84, 84, 0) 100%"
        );
        document.documentElement.style.setProperty("--solid", "#141414");
      }
    });
  }, [chain?.name, isConnected]);

  useEffect(() => {
    let reservezero;
    let reserveone;

    const getReserve: any = getReserves;

    try {
      reservezero = ethers.utils.formatEther(BigNumber.from(getReserve?.[0]));

      reserveone = ethers.utils.formatEther(BigNumber.from(getReserve?.[1]));
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
  }, [calculateMinTokenOut, getReserves, tokenDestinationName, tokenInputs]);

  useEffect(() => {
    if (isApprove === true) {
      checkAllowance();
      setDynamicButtons("swap");
    }
  }, [checkAllowance, isApprove]);

  useEffect(() => {
    if (
      BigInt(String(ethers.utils.parseEther(String(tokenInputs)))) >
      BigInt(allowanceValue)
    ) {
      setDynamicButtons("approve");
    } else {
      setDynamicButtons("swap");
    }
    if (!isConnected) {
      setDynamicButtons("connectwallet");
    }
  }, [allowanceValue, isConnected, tokenInputs]);

  useEffect(() => {
    handleSelectTokenAddress();
  }, [tokenDestinationAddress]);

  const getDynamicButtons = () => {
    switch (dynamicButtons) {
      case "approve":
        return (
          <>
            <button
              disabled={isLoadingApprove}
              className={`mobile-title sm:tablet-title lg:web-title w-full ${
                isLoadingApprove
                  ? "bg-[#2e2e2e] cursor-not-allowed text-white"
                  : "bg-white hover:scale-[1.02] active:scale-95"
              }  text-black px-2 py-5 rounded-xl duration-300`}
              onClick={() => handleApproveToken()}
            >
              {isLoadingApprove ? "Approving..." : "Approve"}
            </button>
          </>
        );
      case "connectwallet":
        return (
          <>
            <ConnectWalletSwap />
          </>
        );
      case "swap":
        return (
          <>
            <button
              onClick={() => handleSwapToQr()}
              disabled={isConfigSwapError}
              className={`mobile-title sm:tablet-title lg:web-title w-full px-2 py-5 rounded-xl duration-300 
         
              ${
                isConfigSwapError
                  ? "cursor-not-allowed bg-[#2e2e2e] text-[#777a7a]"
                  : "hover:brightness-75 cursor-pointer bg-radial-button text-black  hover:scale-[1.02] active:scale-95 duration-300"
              }
          `}
            >
              Swap Now
            </button>
          </>
        );
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <ContainerWrapper>
      <Notification />
      <ModalNetworkPage
        isOpen={showModal}
        onClose={() => setShowModal(!showModal)}
      />

      <ListOfToken
        isOpen={showModalToken0}
        labelNetwork={"Initial Network"}
        chainID={chain?.id}
        handleSelectToken={handleSelectedTokenInit}
        onClose={() => updateModal(false)}
      />

      <ListOfToken
        isOpen={showModalTokenDestination}
        labelNetwork={"Destination Network"}
        chainID={chainID}
        handleSelectToken={handleSelectedTokenDestination}
        onClose={() => setShowModalTokenDestination(!showModalTokenDestination)}
      />

      <div className="forBorder rounded-xl p-[1px]">
        <div
          className={`innerSwap flex flex-col justify-center items-center gap-3 rounded-xl text-white px-[12px] py-[16px] w-full max-w-[500px]`}
        >
          <TitlePage isOpen={() => setIsOpen(!isOpen)} headerName={"Swap"} />
          <DefaultPathwayPage isOpen={isOpen} />

          <div className="flex flex-row justify-between items-center w-full py-4 px-4 xsm:px-6 rounded-full bg-[#00000030] border-[1px] border-[#ffffff30]">
            <p className="mobile-description sm:tablet-description lg:web-description grow text-white">
              Initial Network
            </p>
            {isConnected ? (
              <SelectNetworkPage
                networkName0={networkName}
                networkName1={networkName}
                imgUrl={imgUrl}
                chainID={chain?.id ?? 0}
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
                  type="text"
                  disabled={tokenInitName === ""}
                  id="tokenvalue"
                  name="tokenvalue"
                  placeholder="0.00"
                  value={tokenInputs}
                  onBlur={(e) => setTokenInputs(Number(e.target.value))}
                  className={`w-full bg-transparent lg:grow text-2xl font-[Excon] 
                  `}
                  onChange={(e) => setTokenInputs(Number(e.target.value))}
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
                value={minReceiveToken.toFixed(6)}
                className="w-full bg-transparent lg:grow text-2xl font-[Excon]"
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
              tokenInputs <= 0
                ? "0.00"
                : parseFloat(Number(tokenInputs).toString()).toFixed(2)
            }
            token1Name={tokenDestinationName}
            token1Value={minReceiveToken.toFixed(2)}
            // gasfees={gasfee?.gasPrice?.toString() ?? 0.0}
            gasfees={0.0}
          />

          {getDynamicButtons()}
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default SwapPage;
