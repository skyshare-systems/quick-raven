"use client";
import React, { useEffect, useState } from "react";
import ContainerWrapper from "components/common/container-wrapper";
import DefaultPathwayPage from "components/common/default-pathway";
import ModalNetworkPage from "components/common/modal-network";
import { ConnectNetworkSelect } from "components/common/network-select";
import SelectNetworkPage from "components/common/select-network";
import TitlePage from "components/common/title";
import useMounted from "hooks/useMounted";
import { network } from "lib/json/network";
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
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
import { ethers, BigNumber } from "ethers";
import { CCDexAggregatorABI, LPTokenABI, TokenABI } from "lib/abi";
import { ConnectWalletSwap } from "components/common/connect-wallet-swap";
import { Notification } from "ui/components";
import useSwap from "hooks/useSwap";
import Loading from "components/common/loading";

import SuccessAnim from "public/lottie-files-assets/success-icon.json";
import ErrorAnim from "public/lottie-files-assets/error-icon.json";

const SwapPage = () => {
  // const successOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: SuccessAnim,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid meet",
  //   },
  // };

  // const errorOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: ErrorAnim,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid meet",
  //   },
  // };

  const { isConnected, address: account } = useAccount();
  const { chain } = useNetwork();
  const { hasMounted } = useMounted();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [dynamicButtons, setDynamicButtons] = useState<string>("swap");

  const { showModal: showModalToken0, updateModal } = useModal(
    (state) => state
  );

  const [tokenInputs, setTokenInputs] = useState<number>(0.0);

  const {
    minReceiveToken,
    dexAggregatorAddress,
    showModalTokenDestination,
    approveHash,
    allowanceValue,
    tokenLpAddress,
    dexRouterAddress,

    setMinReceiveToken,
    calculateMinTokenOut,
    checkAllowance,
    setDexAggregatorAddress,
    setDexRouterAddress,
    approveToken,
    setShowModalTokenDestination,
    selectedToken0,
    selectedToken1,
  } = useSwap(account);

  const [hash, setHash] = useState<`0x${string}`>();
  const { chainID } = useLabelNetwork((state) => state);
  const [factoryAddress, setFactoryAddress] = useState<string>("");

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

  const {
    isSuccess: isApprove,
    isLoading: isLoadingApprove,
    isError: isErrorApprove,
    error: errorApprove,
  } = useWaitForTransaction({
    hash: approveHash,
  });

  const {
    isSuccess: isSuccessTransaction,
    isLoading: isLoadingTransaction,
    isError: isErrorTransaction,
    error: errorTransaction,
  } = useWaitForTransaction({
    hash: hash,
  });

  // Dynamic SwapToQr

  // const token0 = ethers.utils.parseEther(tokenInputs.toString());

  // const token1 = ethers.utils.parseEther(minReceiveToken.toString());

  const token0 =
    tokenInputs > 0
      ? ethers.utils.parseEther(tokenInputs.toString())
      : BigInt(1);

  const token1 =
    tokenInputs > 0
      ? ethers.utils.parseEther(minReceiveToken.toString())
      : BigInt(1);

  // Config

  const { config, isError: isConfigSwapError } = usePrepareContractWrite({
    address: dexAggregatorAddress ?? "",
    abi: CCDexAggregatorABI,
    functionName: "swapToQr",
    args: [
      chainID, // chain id destination
      "0x00000000000f4240000000000000000000000000000f42400000000000000000000000000000000000000000000000000000", // request metadata
      [
        dexRouterAddress, // dex router address
        "0x0000000000000000000000000000000000000000",
        tokenInitAddress, // token init address MATIC
        addressDestinationInit, // token destination address
        tokenDestinationAddress, // token destination address
        BigInt(token0.toString()), // amount in
        token1, // amount out
        account,
      ],
    ],
  });

  const { data: getReserves } = useContractRead({
    address: tokenLpAddress ?? "",
    abi: LPTokenABI,
    functionName: "getReserves",
  });

  //functions
  const { writeAsync: swapToQr } = useContractWrite(config);

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

  useEffect(() => {
    network.map((data) => {
      if (chain?.name === data.networkname && isConnected) {
        updateNetworkInit(data.shortname, data.imgUrl, jsonRpcUrlDestination);
        setDexAggregatorAddress(data.dexAggregatorAddress);
        setDexRouterAddress(data.dexRouterAddress["uniswap"]);
        setFactoryAddress(data.factoryAddress);
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
        setMinReceiveToken(0);
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
        3,
        tokenInputs
      );
    }

    if (BigInt(token0.toString()) > BigInt(allowanceValue)) {
      setDynamicButtons("approve");
    } else {
      setDynamicButtons("swap");
    }

    if (isApprove === true) {
      setDynamicButtons("swap");
    }

    if (!isConnected) {
      setDynamicButtons("connectwallet");
    }

    const delayDebounceFn = setTimeout(() => {
      if (tokenInputs > 0) checkAllowance();
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [tokenInputs]);

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
              onClick={() => approveToken()}
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
    <>
      {(isLoadingApprove && approveHash !== "0x" && <Loading />) ||
        (isLoadingTransaction && hash !== "0x" && <Loading />)}

      {isSuccessTransaction && hash !== "0x" && (
        <Notification variant="success">
          {/* <div className="bg-[#7ed321]/32 rounded-md">
            <Lottie
              options={successOptions}
              height={100}
              width={100}
              isClickToPauseDisabled={true}
            />
          </div> */}

          <div className="flex flex-col px-2 max-w-[800px]">
            <h1 className="text-2xl font-medium">Sucess</h1>
            <p className="text-white/50">Transaction Complete!</p>
          </div>
        </Notification>
      )}

      {isErrorApprove && approveHash !== "0x" && (
        <Notification variant="error">
          {/* <div className="bg-[#f72929]/32 rounded-md">
            <Lottie
              options={errorOptions}
              height={100}
              width={100}
              isClickToPauseDisabled={true}
            />
          </div> */}

          <div className="flex flex-col px-2 max-w-[800px]">
            <h1 className="text-2xl font-medium">Error</h1>
            <p className="text-white/50">{errorApprove?.message}</p>
          </div>
        </Notification>
      )}

      {isErrorTransaction && hash !== "0x" && (
        <Notification variant="error">
          {/* <div className="bg-[#f72929]/32 rounded-md">
            <Lottie
              options={errorOptions}
              height={100}
              width={100}
              isClickToPauseDisabled={true}
            />
          </div> */}

          <div className="flex flex-col px-2 max-w-[800px]">
            <h1 className="text-2xl font-medium">Error</h1>
            <p className="text-white/50">{errorTransaction?.message}</p>
          </div>
        </Notification>
      )}

      <ContainerWrapper>
        <ModalNetworkPage
          isOpen={showModal}
          onClose={() => setShowModal(!showModal)}
        />

        <ListOfToken
          isOpen={showModalToken0}
          labelNetwork={"Initial Network"}
          chainID={chain?.id}
          handleSelectToken={selectedToken0}
          onClose={() => updateModal(false)}
        />

        <ListOfToken
          isOpen={showModalTokenDestination}
          labelNetwork={"Destination Network"}
          chainID={chainID}
          handleSelectToken={selectedToken1}
          onClose={() =>
            setShowModalTokenDestination(!showModalTokenDestination)
          }
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
                    type="number"
                    disabled={tokenInitName === ""}
                    id="tokenvalue"
                    name="tokenvalue"
                    placeholder="0.00"
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
                  convertedValue={0}
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
                convertedValue={0}
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
    </>
  );
};

export default SwapPage;
