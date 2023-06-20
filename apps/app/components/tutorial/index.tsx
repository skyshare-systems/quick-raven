"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TokenABI, DexAggregatorABI, LPTokenABI } from "../../abi";
import { Squircle } from "corner-smoothing";

import {
  useAccount,
  useNetwork,
  useSwitchNetwork,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components-backup/common/Loading";

import ImportTokenPage from "../../utils/import-token";

const ModalTutorialPage = ({ isOpen, onClose }: any) => {
  const [openTab, setOpenTab] = useState(0);
  const { isConnected, address: account } = useAccount();
  const { chain } = useNetwork();
  const [networkLabel, setNetworkLabel] = useState(chain?.name);
  const [visible, setVisible] = useState(false);
  const [visibleUsdt, setVisibleUsdt] = useState(false);

  const [usdtAddress, setUsdtAddress] = useState<`0x${string}`>("0x");
  const [usdcAddress, setUsdcAddress] = useState<`0x${string}`>("0x");
  const [wethAddress, setWethAddress] = useState<`0x${string}`>("0x");
  const [maticAddress, setMaticAddress] = useState<`0x${string}`>("0x");

  const { chains, switchNetwork } = useSwitchNetwork();
  const [hash, setHash] = useState<`0x${string}`>();

  const handleClick = () => {
    onClose(false);
    setOpenTab(0);
  };

  const { data, isError, error, isSuccess, isLoading } = useWaitForTransaction({
    hash: hash,
  });

  const { config: configUsdt } = usePrepareContractWrite({
    address: usdtAddress ?? "",
    abi: TokenABI,
    functionName: "mint",
    args: [account!, BigInt(1000000000000000000000)],
  });
  const { config: configUsdc } = usePrepareContractWrite({
    address: usdcAddress ?? "",
    abi: TokenABI,
    functionName: "mint",
    args: [account!, BigInt(1000000000000000000000)],
  });
  const { config: configWeth } = usePrepareContractWrite({
    address: wethAddress ?? "",
    abi: TokenABI,
    functionName: "mint",
    args: [account!, BigInt(1000000000000000000000)],
  });
  const { config: configMatic } = usePrepareContractWrite({
    address: maticAddress ?? "",
    abi: TokenABI,
    functionName: "mint",
    args: [account!, BigInt(1000000000000000000000)],
  });

  const {
    writeAsync: mintUsdt,
    isError: isMintUsdtError,
    error: mintUsdtError,
    isLoading: usdtLoading,
  } = useContractWrite(configUsdt);
  const {
    writeAsync: mintUsdc,
    isError: isMintUsdcError,
    error: mintUsdcError,
    isLoading: usdcLoading,
  } = useContractWrite(configUsdc);
  const {
    writeAsync: mintWeth,
    isError: isMintWethError,
    error: mintWethError,
    isLoading: wethLoading,
  } = useContractWrite(configWeth);
  const {
    writeAsync: mintMatic,
    isError: isMintMaticError,
    error: mintMaticError,
    isLoading: maticLoading,
  } = useContractWrite(configMatic);

  const copiedMatic = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  const copiedUsdt = () => {
    setVisibleUsdt(true);
    setTimeout(() => {
      setVisibleUsdt(false);
    }, 2000);
  };

  useEffect(() => {
    if (isSuccess == true) {
      toast("Transaction has been created");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError === true) {
      toast(error?.message);
    }
  }, [isError]);

  useEffect(() => {
    if (isConnected && chain?.id === 80001) {
      setUsdtAddress("0xa80f9A21dD4938Ef9Cc4a5CFd97d2e27973b491b");
      setUsdcAddress("0xc1D7eC1a5320ed08b6B019cACC80f29905A7EEfA");
      setWethAddress("0xe3aF098836c4641f8EcF9185E49F8C3E74d91348");
      setMaticAddress("0xDe7B766c83ddd2177087d8f6F8916A3B18722669");
    } else if (isConnected && chain?.id === 97) {
      setUsdtAddress("0x44fDA5d55Cd5bFD262DcF0b90F2F105211131d18");
      setUsdcAddress("0x45D463BFf2e01A125298BF9271B7BAFBdBeF001f");
      setWethAddress("0x0518f7B2391916021111BB9Ce53F35a6f8C40Fe3");
      setMaticAddress("0x9570B7D0e54f2AAed59F6615e2be18637A82d881");
    }
  }, [chain?.id]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed top-0 right-0 z-[5]">
        {isError && (
          <>
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
          </>
        )}
        {isSuccess && (
          <>
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
          </>
        )}
      </div>

      {(usdcLoading && <Loading />) ||
        (usdtLoading && <Loading />) ||
        (maticLoading && <Loading />) ||
        (wethLoading && <Loading />)}

      <section className="fixed flex flex-col items-center justify-center z-[3] min-h-[100vh] min-w-full bg-black/50 backdrop-blur-md">
        <div className="relative flex flex-col p-5 max-w-[500px] bg-black rounded-xl border-[1px] border-[#2e2e2e] gap-4 overflow-y-scroll overflow-x-hidden max-h-[70vh]">
          <button
            className="absolute right-5 z-[4] button-hover"
            onClick={() => handleClick()}
          >
            <Image
              src={"/icons/cross-icon.svg"}
              alt={"cross"}
              height={20}
              width={20}
            />
          </button>
          <div className="relative flex justify-center w-full">
            {openTab === 0 && (
              <Image
                src={"/image/step-0.png"}
                alt={"cross"}
                height={200}
                width={200}
                className="grow"
              />
            )}
            {openTab === 1 && (
              <Image
                src={"/image/step-1.png"}
                alt={"cross"}
                height={200}
                width={200}
                className="grow"
              />
            )}
            {openTab === 2 && (
              <Image
                src={"/image/step-2.png"}
                alt={"cross"}
                height={200}
                width={200}
                className="grow"
              />
            )}
            {openTab === 3 && (
              <Image
                src={"/image/step-3.png"}
                alt={"cross"}
                height={200}
                width={200}
                className="grow"
              />
            )}
            {openTab === 4 && (
              <Image
                src={"/image/step-4.png"}
                alt={"cross"}
                height={200}
                width={600}
              />
            )}
          </div>

          {openTab === 0 && (
            <div className="flex flex-col gap-[2px]">
              <p className="mobile-title sm:tablet-title lg:web-title text-[#1CACEF]">
                Get Started
              </p>
              <h3 className="text-white mobile-h3 sm:mobile-h3 lg:web-h3">
                Welcome to Quick Raven
              </h3>
              <p className="mobile-title sm:tablet-title lg:web-title text-[#7A7A7A]">
                Your one-stop cross-chain swapping solution.
              </p>
              <p className="mt-6 text-white mobile-description sm:tablet-description lg:web-description">
                To participate in the Quick Raven Testnet on the Binance Smart
                Chain, please adhere to the following instructions
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {openTab === 1 && (
              <>
                <p className="mobile-title sm:tablet-title lg:web-title text-[#1CACEF]">
                  Step 1
                </p>

                <h3 className="text-white mobile-h3 sm:mobile-h3 lg:web-h3">
                  Set up a compatible wallet
                </h3>

                <p className="text-white mobile-description sm:tablet-description lg:web-description">
                  Ensure you have a wallet that supports the Binance Smart Chain
                  network, such as{" "}
                  <Link
                    href={"https://metamask.io/"}
                    className="text-[#efc81c]"
                    target="_blank"
                  >
                    Metamask
                  </Link>
                  . This will enable you to securely interact with the Quick
                  Raven Testnet.
                </p>
              </>
            )}

            {openTab === 2 && (
              <div className="flex flex-col gap-2">
                <p className="mobile-title sm:tablet-title lg:web-title text-[#1CACEF]">
                  Step 2
                </p>
                <h3 className="text-white mobile-h3 sm:mobile-h3 lg:web-h3">
                  Obtain specific test tokens
                </h3>
                <p className="text-white mobile-description sm:tablet-description lg:web-description">
                  Import and claim test/peg tokens explicitly designed for the
                  <Link
                    href={"https://mumbaifaucet.com/"}
                    target="_blank"
                    className="text-[#C91CEF]"
                  >
                    {" "}
                    Polygon Mumbai{" "}
                  </Link>
                  and
                  <Link
                    href={"https://testnet.binance.org/faucet-smart/"}
                    target="_blank"
                    className="text-[#efc81c]"
                  >
                    {" "}
                    Binance Smart Chain Testnet{" "}
                  </Link>
                  network using the following addresses:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="grid grid-row-2 gap-2">
                    <h1 className="text-white mobile-description sm:tablet-description lg:web-description">
                      MATIC (Polygon):
                    </h1>
                    <h1 className="text-[#D449F2] mobile-description sm:tablet-description lg:web-description">
                      0xDe7B766c83ddd2177087
                      <br className="flex xsm:hidden sm:flex"></br>
                      d8f6F8916A3B18722669
                    </h1>
                    <div className="flex flex-row justify-between gap-2  w-full">
                      <CopyToClipboard text="0xDe7B766c83ddd2177087d8f6F8916A3B18722669">
                        <button
                          className="bg-[#252525] text-[#c6c6c6] w-full flex flex-row gap-2 items-center justify-center px-3 py-3 uppercase rounded-md mobile-tile sm:tablet-title lg:web-title hover:scale-105 active:scale-95 duration-300"
                          onClick={() => copiedMatic()}
                        >
                          <Image
                            src={"/icons/modal/copy-icon.svg"}
                            alt={"copy-icon"}
                            height={15}
                            width={15}
                          />
                          {visible ? "Copied" : "Copy"}
                        </button>
                      </CopyToClipboard>

                      <ImportTokenPage
                        name={"Matic"}
                        address={"0xDe7B766c83ddd2177087d8f6F8916A3B18722669"}
                        symbols={"MATIC"}
                        decimal={18}
                      />
                    </div>
                  </div>

                  <div className="grid grid-row-2 gap-2">
                    <h1 className="text-white mobile-description sm:tablet-description lg:web-description">
                      USDT (Binance):
                    </h1>
                    <p className="text-[#F2D349] mobile-description sm:tablet-description lg:web-description w-auto">
                      0x44fDA5d55Cd5bFD262D
                      <br className="flex xsm:hidden sm:flex"></br>
                      cF0b90F2F105211131d18
                    </p>

                    <div className="flex flex-row justify-between gap-2  w-full">
                      <CopyToClipboard text="0x44fDA5d55Cd5bFD262DcF0b90F2F105211131d18">
                        <button
                          className="bg-[#252525] text-[#c6c6c6] w-full flex flex-row gap-2 items-center justify-center px-3 py-3 uppercase rounded-md mobile-tile sm:tablet-title lg:web-title hover:scale-105 active:scale-95 duration-300"
                          onClick={() => copiedUsdt()}
                        >
                          <Image
                            src={"/icons/modal/copy-icon.svg"}
                            alt={"copy-icon"}
                            height={15}
                            width={15}
                          />
                          {visibleUsdt ? "Copied" : "Copy"}
                        </button>
                      </CopyToClipboard>

                      <ImportTokenPage
                        name={"USDT"}
                        address={"0x44fDA5d55Cd5bFD262DcF0b90F2F105211131d18"}
                        symbols={"USDT"}
                        decimal={18}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {openTab === 3 && (
              <>
                <div className="flex flex-row gap-5">
                  {chains.map((x, index) => (
                    <button
                      onClick={() => switchNetwork?.(x.id)}
                      disabled={!switchNetwork || x.id === chain?.id}
                      key={index}
                      className={`flex flex-row items-center gap-2 rounded-xl  px-3 py-4 ${
                        chain?.name === x.name
                          ? "cursor-not-allowed border-[#3b3b3b] border-2 text-white"
                          : "button-hover hover:brightness-125 bg-radial-button text-black "
                      }`}
                    >
                      <p className="mobile-title sm:tablet-title lg:web-title">
                        {x.name}
                      </p>
                    </button>
                  ))}
                </div>

                <div
                  className={`relative flex flex-wrap items-center justify-center w-full gap-5 ${
                    !isConnected ? "p-5" : "p-0"
                  }`}
                >
                  {!isConnected && (
                    <div className="absolute flex items-center justify-center w-full h-full p-5 backdrop-blur-md bg-black/50 rounded-xl">
                      <h3 className="text-center text-white">
                        Connect Your Wallet First
                      </h3>
                    </div>
                  )}

                  <button
                    onClick={mintUsdc}
                    className={`px-6 py-5 uppercase text-black mobile-title sm:tablet-title lg:web-title ${
                      chain?.name === "Polygon Mumbai"
                        ? "bg-[#C91CEF]"
                        : "bg-[#efc815]"
                    } rounded-xl w-full max-w-[215px]`}
                  >
                    {usdcLoading ? "Claiming USDC..." : "CLAIM 1000 USDC"}
                  </button>
                  <button
                    onClick={() =>
                      mintUsdt?.().then((res) => {
                        setHash(res?.hash);
                      })
                    }
                    className={`px-6 py-5 uppercase text-black mobile-title sm:tablet-title lg:web-title ${
                      chain?.name === "Polygon Mumbai"
                        ? "bg-[#C91CEF]"
                        : "bg-[#efc815]"
                    } rounded-xl w-full max-w-[215px]`}
                  >
                    {usdtLoading ? "Claiming USDT..." : "CLAIM 1000 USDT"}
                  </button>
                  <button
                    onClick={() =>
                      mintWeth?.().then((res) => {
                        setHash(res?.hash);
                      })
                    }
                    className={`px-6 py-5 uppercase text-black mobile-title sm:tablet-title lg:web-title ${
                      chain?.name === "Polygon Mumbai"
                        ? "bg-[#C91CEF]"
                        : "bg-[#efc815]"
                    } rounded-xl w-full max-w-[215px]`}
                  >
                    {wethLoading ? "Claiming WETH..." : "CLAIM 1000 WETH"}
                  </button>
                  <button
                    onClick={() =>
                      mintMatic?.().then((res) => {
                        setHash(res?.hash);
                      })
                    }
                    className={`px-6 py-5 uppercase text-black mobile-title sm:tablet-title lg:web-title ${
                      chain?.name === "Polygon Mumbai"
                        ? "bg-[#C91CEF]"
                        : "bg-[#efc815]"
                    } rounded-xl w-full max-w-[215px]`}
                  >
                    {maticLoading ? "Claiming MATIC..." : "CLAIM 1000 MATIC"}
                  </button>
                </div>
                <p className="mobile-title sm:tablet-title lg:web-title text-[#1CACEF]">
                  Step 3
                </p>

                <h3 className="text-white mobile-h3 sm:mobile-h3 lg:web-h3">
                  Claim your Quick Raven test tokens
                </h3>

                <p className="text-white mobile-description sm:tablet-description lg:web-description">
                  Click on the buttons above corresponding to your desired test
                  tokens below to initiate the claiming process. By doing so,
                  you will gain access to the testnet and be able to fully
                  explore the functionalities offered by Quick Raven.
                </p>
              </>
            )}

            {openTab === 4 && (
              <>
                <p className="mobile-title sm:tablet-title lg:web-title text-[#1CACEF]">
                  Step 4
                </p>

                <h3 className="text-white mobile-h3 sm:mobile-h3 lg:web-h3">
                  Explore our product
                </h3>

                <p className="text-white mobile-description sm:tablet-description lg:web-description">
                  Once you have successfully claimed your test tokens, we
                  encourage you to dive into the exciting world of cross-chain
                  swapping and embark on your journey with the seamless
                  integration between various blockchains.
                </p>

                <p className="mt-8 text-[#7a7a7a] mobile-description sm:tablet-description lg:web-description">
                  We appreciate your interest in the Quick Raven Testnet and
                  look forward to your participation. If you have any further
                  inquiries or require assistance, please do not hesitate to
                  contact our support team.
                </p>
              </>
            )}
          </div>

          <div
            className={`flex flex-row items-center mt-5 ${
              openTab === 0 ? "justify-end" : "justify-between"
            } w-full`}
          >
            <button
              disabled={openTab === 0}
              onClick={() => setOpenTab(openTab - 1)}
              className={`${
                openTab === 0
                  ? "cursor-not-allowed hidden"
                  : "flex cursor-pointer"
              } px-6 py-3 text-white mobile-title sm:tablet-title lg:web-title bg-[#212121] rounded-xl`}
            >
              Back
            </button>
            <div className="flex flex-row justify-between gap-5">
              <button
                disabled={openTab === 4}
                onClick={() => setOpenTab(openTab + 1)}
                className={`${
                  openTab === 4
                    ? "cursor-not-allowed hidden"
                    : "flex cursor-pointer"
                } px-6 py-3 text-black mobile-title sm:tablet-title lg:web-title bg-radial-button rounded-xl`}
              >
                Next
              </button>
              {openTab === 4 && (
                <button
                  onClick={() => onClose(false)}
                  className={`px-6 py-3 text-black mobile-title sm:tablet-title lg:web-title bg-radial-button rounded-xl`}
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModalTutorialPage;
