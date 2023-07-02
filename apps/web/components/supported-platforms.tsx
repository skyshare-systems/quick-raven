import React, { useEffect, useState } from "react";
import Image from "next/image";

import TransactionPage from "./transaction-section";

import Grid from "public/assets/supported-platforms/s3-grid.svg";
import GlowTop from "public/assets/supported-platforms/s3-glow-top.svg";
import GlowLeft from "public/assets/supported-platforms/s3-stats-glow-left.svg";
import GlowRight from "public/assets/supported-platforms/s3-stats-glow-right.svg";

const bridge = [
  {
    imgUrl: "/icons/Bridge/item.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Bridge/item-1.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Bridge/item-2.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Bridge/item-3.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Bridge/item-4.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Bridge/item-5.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Bridge/item-6.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Bridge/item-7.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Bridge/item-8.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Bridge/item-9.png",
    isLive: false,
  },
];

const dexs = [
  {
    imgUrl: "/icons/DEXs/item.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/DEXs/item-1.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/DEXs/item-2.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/DEXs/item-3.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/DEXs/item-4.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/DEXs/item-5.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/DEXs/item-6.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/DEXs/item-7.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/DEXs/item-8.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/DEXs/item-9.png",
    isLive: false,
  },
];

const chains = [
  {
    imgUrl: "/icons/Chains/item.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Chains/item-1.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Chains/item-2.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Chains/item-3.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Chains/item-4.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Chains/item-5.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Chains/item-6.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Chains/item-7.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Chains/item-8.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Chains/item-9.png",
    isLive: false,
  },
];

const wallet = [
  {
    imgUrl: "/icons/Wallets/item.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Wallets/item-1.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Wallets/item-2.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Wallets/item-3.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Wallets/item-4.png",
    isLive: true,
  },
  {
    imgUrl: "/icons/Wallets/item-5.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Wallets/item-6.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Wallets/item-7.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Wallets/item-8.png",
    isLive: false,
  },
  {
    imgUrl: "/icons/Wallets/item-9.png",
    isLive: false,
  },
];

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
