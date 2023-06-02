import React, { useState } from "react";
import Image from "next/image";
// import ModalLinkEmblem from './modal-link-emblem'
import { network } from "./network";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

const ModalNetworkPage = ({
  labelnetwork,
  initNetwork,
  isOpen,
  handleDestinationNetwork,
  handleInitNetwork,
  isLoading,
  pendingChainId,
  onClose,
}: any) => {
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  if (!isOpen) return null;
  return (
    <div className="fixed top-0 h-full w-full flex flex-col justify-center items-center bg-black/30 backdrop-blur-sm z-[3]">
      <div className="relative flex flex-col rounded-2xl h-full w-full max-w-[500px] max-h-[250px] bg-radial-modal  p-5">
        <div className="absolute flex flex-col gap-5 z-[2] w-full">
          <div className="relative flex flex-row justify-between">
            <p className="mobile-overline sm:tablet-overline lg:web-overline text-white">
              Please choose your {labelnetwork}
            </p>
            <button
              className="absolute right-10 z-[4] duration-300 hover:scale-105 active-95"
              onClick={() => onClose(false)}
            >
              <Image
                src={"/icons/cross-icon.svg"}
                alt={"cross"}
                height={20}
                width={20}
              />
            </button>
          </div>

          <div className="flex flex-wrap gap-5">
            {labelnetwork === "Destination Network" ? (
              <>
                {network
                  .filter((filterdata) => filterdata.shortname !== initNetwork)
                  .map((data, index) => {
                    return (
                      <button
                        onClick={() =>
                          handleDestinationNetwork(data.shortname, data.imgUrl)
                        }
                        key={index}
                        className="flex flex-row items-center gap-2 bg-[#212121] border-2 rounded-full border-[#3b3b3b] px-3 py-2 hover:brightness-125 duration-300 hover:scale-105 active-95"
                      >
                        <Image
                          src={data.imgUrl}
                          alt={"refresh"}
                          height={25}
                          width={25}
                        />
                        <p className="mobile-title sm:tablet-title lg:web-title text-white">
                          {data.shortname}
                        </p>
                      </button>
                    );
                  })}
              </>
            ) : (
              <>
                {network.map((data) => {
                  return (
                    <>
                      {chains
                        .filter(
                          (filterData) => filterData.name === data.networkname
                        )
                        .map((x) => (
                          <button
                            disabled={!switchNetwork || x.id === chain?.id}
                            key={x.id}
                            onClick={() =>
                              handleInitNetwork(
                                x.name === data.networkname && data.shortname,
                                data.imgUrl,
                                x.id
                              )
                            }
                            className="flex flex-row items-center gap-2 bg-[#212121] border-2 rounded-full border-[#3b3b3b] px-3 py-2 duration-300 hover:brightness-125 hover:scale-105 active-95"
                          >
                            <Image
                              src={data.imgUrl}
                              alt={"refresh"}
                              height={25}
                              width={25}
                            />
                            <p className="mobile-title sm:tablet-title lg:web-title text-white">
                              {x.name === data.networkname && data.shortname}

                              {isLoading &&
                                pendingChainId === x.id &&
                                " (switching)"}
                            </p>
                          </button>
                        ))}
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className="absolute top-0 left-0 border-[2px] border-[#3b3b3b] h-full w-full z-[1] rounded-2xl faded-bottom" />
      </div>
    </div>
  );
};

export default ModalNetworkPage;
