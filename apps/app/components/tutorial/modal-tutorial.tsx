"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ModalTutorialPage = ({ isOpen, onClose }: any) => {
  const [openTab, setOpenTab] = useState(4);
  const hide = "hidden";
  const show = "auto";

  const handleClick = () => {
    onClose(false);
    setOpenTab(0);
  };

  if (!isOpen) return null;

  return (
    <>
      <section className="fixed flex flex-col items-center justify-center z-[3] min-h-[100vh] min-w-full bg-black/30 backdrop-blur-sm">
        <div className="relative flex flex-col p-5 max-w-[500px] h-full w-full bg-black rounded-xl border-[1px] border-[#2e2e2e] gap-4">
          <button
            className="absolute right-5 z-[4]"
            onClick={() => handleClick()}
          >
            <Image
              src={"/icons/cross-icon.svg"}
              alt={"cross"}
              height={20}
              width={20}
            />
          </button>
          <div className="flex w-full">
            {openTab === 0 && (
              <Image
                src={"/image/step-0.svg"}
                alt={"cross"}
                height={200}
                width={200}
                className="grow"
              />
            )}
            {openTab === 1 && (
              <Image
                src={"/image/step-1.svg"}
                alt={"cross"}
                height={200}
                width={200}
                className="grow"
              />
            )}
            {openTab === 2 && (
              <Image
                src={"/image/step-2.svg"}
                alt={"cross"}
                height={200}
                width={200}
                className="grow"
              />
            )}
            {openTab === 3 && (
              <Image
                src={"/image/step-3.svg"}
                alt={"cross"}
                height={200}
                width={200}
                className="grow"
              />
            )}
            {openTab === 4 && (
              <Image
                src={"/image/step-0.svg"}
                alt={"cross"}
                height={200}
                width={200}
                className="grow"
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

          <div className="flex flex-col gap-4">
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
                  network, such as Metamask. This will enable you to securely
                  interact with the Quick Raven Testnet.
                </p>
              </>
            )}

            {openTab === 2 && (
              <>
                <p className="mobile-title sm:tablet-title lg:web-title text-[#1CACEF]">
                  Step 2
                </p>

                <h3 className="text-white mobile-h3 sm:mobile-h3 lg:web-h3">
                  Obtain specific test tokens
                </h3>

                <p className="text-white mobile-description sm:tablet-description lg:web-description">
                  Acquire test tokens explicitly designed for the Binance Smart
                  Chain network. These tokens are exclusively available on the
                  Binance Smart Chain Testnet.
                </p>
              </>
            )}

            {openTab === 3 && (
              <>
                <div className="flex flex-wrap items-center justify-center w-full gap-5">
                  <button className="px-6 py-3 uppercase text-black mobile-title sm:tablet-title lg:web-title bg-[#1cef5f] rounded-xl grow">
                    CLAIM 1000 USDC
                  </button>
                  <button className="px-6 py-3 uppercase text-black mobile-title sm:tablet-title lg:web-title bg-[#1cef5f] rounded-xl grow">
                    CLAIM 1000 USDT
                  </button>
                  <button className="px-6 py-3 uppercase text-black mobile-title sm:tablet-title lg:web-title bg-[#1cef5f] rounded-xl grow">
                    CLAIM 1000 WETH
                  </button>
                  <button className="px-6 py-3 uppercase text-black mobile-title sm:tablet-title lg:web-title bg-[#1cef5f] rounded-xl grow">
                    CLAIM 1000 MATIC
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
                onClick={() => handleClick()}
                className="px-6 py-3 text-white mobile-title sm:tablet-title lg:web-title"
              >
                Skip
              </button>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModalTutorialPage;
