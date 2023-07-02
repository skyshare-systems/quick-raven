import React, { useEffect, useState } from "react";
import Image from "next/image";

import TransactionPage from "./transaction-section";

import Grid from "public/assets/supported-platforms/s3-grid.svg";
import GlowTop from "public/assets/supported-platforms/s3-glow-top.svg";
import GlowLeft from "public/assets/supported-platforms/s3-stats-glow-left.svg";
import GlowRight from "public/assets/supported-platforms/s3-stats-glow-right.svg";

const SupportedPlatformPage = () => {
  return (
    <div
      className="relative flex flex-col py-[10rem] h-auto lg:h-[150vh] justify-between items-center gap-9"
      id="supported-platform-section"
    >
      <Grid className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full" />
      <GlowTop className="absolute top-[0] left-1/2 transform -translate-x-1/2 w-full sm:w-[40rem]" />
      <GlowLeft className="absolute bottom-[10rem] left-0 w-full sm:w-[25rem]" />
      <GlowRight className="absolute -bottom-[5rem] right-0 w-full sm:w-[25rem]" />
      <div className="flex flex-col gap-16 w-full justify-center items-center max-w-[1200px] px-5 lg:px-0">
        <h2 className="text-center mobile-h2 sm:tablet-h2 md:web-h2 text-white">
          Supported Platforms
        </h2>
        <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[800px] gap-9">
          <div className="flex flex-col justify-center gap-9">
            <h4 className="web-h4 text-white text-center">Chains</h4>
            <div className="flex flex-wrap gap-9 justify-center items-center max-w-[340px]">
              {chains.map((data, index) => {
                return (
                  <Image
                    key={index}
                    src={data.imgUrl}
                    alt={data.imgUrl}
                    height={35}
                    width={35}
                    className={` ${data.isLive ? "opacity-1" : "opacity-40"}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-9">
            <h4 className="web-h4 text-white text-center">
              Decentralized Exchanges
            </h4>
            <div className="flex flex-wrap gap-9 justify-center items-center max-w-[340px]">
              {dexs.map((data, index) => {
                return (
                  <Image
                    key={index}
                    src={data.imgUrl}
                    alt={data.imgUrl}
                    height={35}
                    width={35}
                    className={` ${data.isLive ? "opacity-1" : "opacity-40"}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[800px] gap-9">
          <div className="flex flex-col justify-center gap-9">
            <h4 className="web-h4 text-white text-center">
              Cross-chain Bridges
            </h4>
            <div className="flex flex-wrap gap-9 justify-center items-center max-w-[340px]">
              {bridge.map((data, index) => {
                return (
                  <Image
                    key={index}
                    src={data.imgUrl}
                    alt={data.imgUrl}
                    height={35}
                    width={35}
                    className={` ${data.isLive ? "opacity-1" : "opacity-40"}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-9">
            <h4 className="web-h4 text-white text-center">Crypto Wallets</h4>
            <div className="flex flex-wrap gap-9 justify-center items-center max-w-[340px]">
              {wallet.map((data, index) => {
                return (
                  <Image
                    key={index}
                    src={data.imgUrl}
                    alt={data.imgUrl}
                    height={35}
                    width={35}
                    className={` ${data.isLive ? "opacity-1" : "opacity-40"}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <TransactionPage />
    </div>
  );
};

export default SupportedPlatformPage;

export const bridge = [
  {
    imgUrl: "/icons/bridge/item.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/bridge/item-1.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/bridge/item-2.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/bridge/item-3.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/bridge/item-4.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/bridge/item-5.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/bridge/item-6.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/bridge/item-7.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/bridge/item-8.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/bridge/item-9.png",
    isLive: false,
  },
];

export const dexs = [
  {
    imgUrl: "/icons/dexs/item.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/dexs/item-1.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/dexs/item-2.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/dexs/item-3.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/dexs/item-4.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/dexs/item-5.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/dexs/item-6.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/dexs/item-7.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/dexs/item-8.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/dexs/item-9.png",
    isLive: false,
  },
];

export const chains = [
  {
    imgUrl: "/icons/chains/item.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/chains/item-1.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/chains/item-2.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/chains/item-3.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/chains/item-4.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/chains/item-5.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/chains/item-6.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/chains/item-7.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/chains/item-8.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/chains/item-9.png",
    isLive: false,
  },
];

export const wallet = [
  {
    imgUrl: "/icons/wallets/item.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/wallets/item-1.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/wallets/item-2.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/wallets/item-3.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/wallets/item-4.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/wallets/item-5.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/wallets/item-6.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/wallets/item-7.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/wallets/item-8.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/wallets/item-9.png",
    isLive: false,
  },
];
