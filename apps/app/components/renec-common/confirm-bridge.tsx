import React, { useEffect } from "react";
import Image from "next/image";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { TokenABI } from "abi";

const ConfirmBridge = ({ isOpen, onClose }: any) => {
  const hide = "hidden";
  const show = "auto";

  const { config } = usePrepareContractWrite({
    address: "0xa80f9A21dD4938Ef9Cc4a5CFd97d2e27973b491b",
    abi: TokenABI,
    functionName: "transfer",
  });

  const { writeAsync: transfer } = useContractWrite(config);

  useEffect(() => {
    isOpen
      ? (document.body.style.overflowY = hide)
      : (document.body.style.overflowY = show);
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed top-0 flex justify-center items-center h-full w-full bg-black/30 backdrop-blur-sm z-[4]">
      <div className="flex justify-center items-center grow p-[1px] max-w-[420px] rounded-2xl bg-[#363e4d]">
        <div className="relative flex flex-col rounded-2xl h-full grow max-w-[420px] max-h-[520px] bg-[#0d1624] p-5 gap-5">
          <div className="flex flex-row items-center justify-between">
            <h1 className="grow mobile-description sm:tablet-description lg:web-description text-white">
              Confirm Bridge
            </h1>
            <button
              onClick={() => onClose(false)}
              className="cursor-pointer duration-300 hover:scale-105 active:scale-95"
            >
              <Image
                src={"/icons/cross-icon.svg"}
                alt={"cross"}
                height={15}
                width={15}
                className="brightness-200"
              />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center p-2 bg-[#151E2C] rounded-lg gap-3">
            <div className="flex flex-col w-full max-w-[151px] p-2 gap-2">
              <h1 className="text-[#D2EEFC] text-center p-2 rounded-lg uppercase mobile-title sm:tablet-title md:web-title bg-[#1cacef]/25">
                Polygon
              </h1>

              <div className="flex flex-row items-center gap-3 w-full px-1">
                <Image
                  src={"/icons/matic-icon.svg"}
                  alt={"cross"}
                  height={25}
                  width={25}
                />

                <div className="flex flex-col gap-2">
                  <h1 className="mobile-tile sm:tablet-title md:web-title text-white">
                    1 Matic
                  </h1>
                  <h1 className="mobile-overline sm:tablet-overline md:web-overline text-[#838383]">
                    ~$0.99
                  </h1>
                </div>
              </div>
            </div>
            <Image
              src={"/icons/arrow-right-icon.svg"}
              alt={"cross"}
              height={20}
              width={20}
              className="rotate-90 sm:rotate-0 brightness-200"
            />

            <div className="flex flex-col w-full max-w-[151px] p-2 gap-2">
              <h1 className="text-[#F4D2FC] text-center p-2 rounded-lg uppercase mobile-title sm:tablet-title md:web-title bg-[#c91cef]/25">
                Renec
              </h1>

              <div className="flex flex-row items-center gap-3 w-full px-1">
                <Image
                  src={"/icons/renec-icon.svg"}
                  alt={"cross"}
                  height={25}
                  width={25}
                />

                <div className="flex flex-col gap-2">
                  <h1 className="mobile-tile sm:tablet-title md:web-title text-white">
                    1 REUSD
                  </h1>
                  <h1 className="mobile-overline sm:tablet-overline md:web-overline text-[#838383]">
                    ~$0.99
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* <div className="flex flex-row items-center gap-2">
              <span className="flex justify-center items-center mobile-overline sm:tablet-overline md:web-overline text-white bg-[#363e4d] rounded-full h-8 w-8">
                1
              </span>

              <p className="mobile-description sm:tablet-description md:web-description text-[#636B79]">
                Select Source Wallet
              </p>
            </div> */}

            {/* <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly sm:items-center gap-2">
              <button className="flex flex-row gap-3 items-center w-full p-2 mobile-title sm:tablet-title md:web-title bg-[#151E2C] text-white rounded-lg hover:brightness-150 active:scale-95 duration-300">
                <Image
                  src={"/icons/metamask-icon.svg"}
                  alt={"cross"}
                  height={25}
                  width={25}
                  className="rounded-full"
                />{" "}
                Metamask
              </button>

              <button className="flex flex-row gap-3 items-center border-[1px] border-[#1CEF5F] w-full p-2 mobile-title sm:tablet-title md:web-title bg-[#1cef5f]/30 text-white rounded-lg hover:brightness-150 active:scale-95 duration-300">
                <Image
                  src={"/icons/demon-wallet-icon.svg"}
                  alt={"cross"}
                  height={25}
                  width={25}
                  className="rounded-full"
                />{" "}
                Demon Wallet
              </button>
            </div> */}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <span className="flex justify-center items-center mobile-overline sm:tablet-overline md:web-overline text-white bg-[#363e4d] rounded-full h-8 w-8">
                1
              </span>

              <p className="mobile-description sm:tablet-description md:web-description text-[#636B79]">
                Input Demon Wallet address
              </p>
            </div>

            <div className="flex flex-row justify-between gap-5 px-5  border-[1px] border-[#363E4D] rounded-xl bg-[#151E2C]">
              <Image
                src={"/icons/wallet-gray-icon.svg"}
                alt={"cross"}
                height={20}
                width={20}
              />
              <input
                type="text"
                id="wallet-address"
                name="wallet-address"
                placeholder="Your wallet address here..."
                className="relative w-full h-full py-3 text-white grow"
              />
            </div>

            <button
              onClick={() => transfer?.()}
              className={`mobile-title sm:tablet-title lg:web-title w-full px-2 py-5 rounded-xl duration-300 hover:brightness-75 cursor-pointer button-radial-renec text-white  hover:scale-[1.02] active:scale-95 `}
            >
              Confirm Bridge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBridge;
