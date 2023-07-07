import React, { useState, useEffect } from "react";
import Image from "next/image";
// import ModalLinkEmblem from './modal-link-emblem'
import { network } from "lib/json/network";
import { useNetwork, useSwitchNetwork } from "wagmi";
import {
  useNetworkDestination,
  useNetworkInit,
  useLabelNetwork,
} from "lib/stores.ts/stores";
import shortenName from "utils/limit-text";

const ModalNetworkPage = ({ isOpen, onClose }: any) => {
  const [name, setName] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");

  const [uColor, setUColor] = useState<string>("");
  const [hColor, setHColor] = useState<string>("");
  const [sColor, setSColor] = useState<string>("");

  const { chain } = useNetwork();
  const { chains, switchNetwork, pendingChainId, isLoading, isSuccess } =
    useSwitchNetwork();

  const { networkName, updateNetwork: updateNetworkInit } = useNetworkInit(
    (state) => state
  );

  const { labelNetwork, updateLabelNetwork } = useLabelNetwork(
    (state) => state
  );

  const {
    jsonRpcUrl: jsonRpcUrlDestination,
    updateNetwork: updateNetworkDestination,
  } = useNetworkDestination((state) => state);

  //Destination
  function handleClick(
    name: string,
    imgUrl: string,
    jsonRpcUrl: string,
    lowerColor: string,
    highColor: string,
    chainID: number
  ) {
    updateLabelNetwork(labelNetwork, chainID);
    updateNetworkDestination(name, imgUrl, jsonRpcUrl);
    onClose(false);

    document.documentElement.style.setProperty("--bottom", lowerColor);
    document.documentElement.style.setProperty("--borderDown", highColor);
  }

  //Init
  function handleClickInit(
    network: number,
    name: string,
    imgUrl: string,
    upperColor: string,
    solid: string,
    highColor: string
  ) {
    switchNetwork?.(network);
    setName(name);
    setImgUrl(imgUrl);
    setUColor(upperColor);
    setHColor(highColor);
    setSColor(solid);
  }

  useEffect(() => {
    if (isSuccess === true) {
      updateNetworkInit(name, imgUrl, jsonRpcUrlDestination);
      console.log(name + "Testing");

      document.documentElement.style.setProperty("--borderUp", hColor);
      document.documentElement.style.setProperty("--top", uColor);
      document.documentElement.style.setProperty("--solid", sColor);
      onClose(false);
    }
  }, [imgUrl, isSuccess, name]);

  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 h-full w-full flex flex-col justify-center items-center bg-black/50 backdrop-blur-md z-[3]">
      <div className="relative flex flex-col rounded-2xl h-full w-full max-w-[500px] max-h-[250px] bg-[#212121]  p-5">
        <div className="absolute flex flex-col gap-5 z-[2] w-full">
          <div className="relative flex flex-row justify-between">
            <p className="mobile-overline sm:tablet-overline lg:web-overline text-white">
              Please choose your {labelNetwork}
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
            {labelNetwork === "Destination Network" ? (
              <>
                {network
                  .filter(
                    (filterdata) =>
                      filterdata.shortname !== networkName &&
                      filterdata.shortname !== "Gnosis" &&
                      filterdata.shortname !== "BSC"
                  )
                  .map((data, index) => {
                    return (
                      <button
                        onClick={() =>
                          handleClick(
                            data.shortname,
                            data.imgUrl,
                            data.jsonRpcUrl,
                            data.lowerColor,
                            data.highColor,
                            data.chainID
                          )
                        }
                        key={index}
                        className="flex flex-row items-center gap-2 bg-[#212121] border-[1px] rounded-full border-[#3b3b3b] px-3 py-2 hover:brightness-125 duration-300  active:scale-95"
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
                          (filterData) =>
                            filterData.name === data.networkname &&
                            filterData.id !== 10200
                        )
                        .map((x) => (
                          <button
                            disabled={!switchNetwork || x.id === chain?.id}
                            key={x.id}
                            onClick={() =>
                              handleClickInit(
                                x.id,
                                data.networkname,
                                data.imgUrl,
                                data.upperColor,
                                data.solidColor,
                                data.highColor
                              )
                            }
                            className="flex flex-row items-center gap-2 bg-[#212121] border-[1px] rounded-full border-[#3b3b3b] px-3 py-2 duration-300 hover:brightness-125 active:scale-95"
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
        <div className="absolute top-0 left-0 border-[1px] border-[#3b3b3b] h-full w-full z-[1] rounded-2xl faded-bottom" />
      </div>
    </div>
  );
};

export default ModalNetworkPage;
