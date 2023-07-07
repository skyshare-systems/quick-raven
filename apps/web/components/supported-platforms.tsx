import React, { useEffect, useState } from "react";
import Image from "next/image";

import TransactionPage from "./transaction-section";

import Grid from "public/assets/supported-platforms/s3-grid-top.svg";
import GlowTop from "public/assets/supported-platforms/s3-glow-top.svg";

import { Tooltip as ReactTooltip } from "react-tooltip";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

const chains = [
  {
    imgUrl: "/icons/Chains/item.png",
    isLive: true,
    anchorId: "Ethereum",
  },
  {
    imgUrl: "/icons/Chains/item-1.png",
    isLive: true,
    anchorId: "Polygon",
  },
  {
    imgUrl: "/icons/Chains/item-2.png",
    isLive: true,
    anchorId: "Binance Smart Chain",
  },
  {
    imgUrl: "/icons/Chains/item-3.png",
    isLive: true,
    anchorId: "Solana",
  },
  {
    imgUrl: "/icons/Chains/item-4.png",
    isLive: true,
    anchorId: "Gnosis",
  },
  {
    imgUrl: "/icons/Chains/item-5.png",
    isLive: false,
    anchorId: "Avalanche",
  },
  {
    imgUrl: "/icons/Chains/item-6.png",
    isLive: false,
    anchorId: "Fantom",
  },
  {
    imgUrl: "/icons/Chains/item-7.png",
    isLive: false,
    anchorId: "Arbitrum",
  },
  {
    imgUrl: "/icons/Chains/item-8.png",
    isLive: false,
    anchorId: "Optimism",
  },
  {
    imgUrl: "/icons/Chains/item-9.png",
    isLive: false,
    anchorId: "zkSync",
  },
];

const dexs = [
  {
    imgUrl: "/icons/DEXs/item.png",
    isLive: true,
    anchorId: "Uniswap",
  },
  {
    imgUrl: "/icons/DEXs/item-1.png",
    isLive: true,
    anchorId: "Sushiswap",
  },
  {
    imgUrl: "/icons/DEXs/item-2.png",
    isLive: true,
    anchorId: "Pancakeswap",
  },
  {
    imgUrl: "/icons/DEXs/item-3.png",
    isLive: true,
    anchorId: "Curve Finance",
  },
  {
    imgUrl: "/icons/DEXs/item-4.png",
    isLive: false,
    anchorId: "Clipper",
  },
  {
    imgUrl: "/icons/DEXs/item-5.png",
    isLive: false,
    anchorId: "Apeswap",
  },
  {
    imgUrl: "/icons/DEXs/item-6.png",
    isLive: false,
    anchorId: "WOO Network",
  },
  {
    imgUrl: "/icons/DEXs/item-7.png",
    isLive: false,
    anchorId: "Hashflow",
  },
  {
    imgUrl: "/icons/DEXs/item-8.png",
    isLive: false,
    anchorId: "DODO",
  },
  {
    imgUrl: "/icons/DEXs/item-9.png",
    isLive: false,
    anchorId: "QuickSwap",
  },
];

const bridge = [
  {
    imgUrl: "/icons/Bridge/item.png",
    isLive: true,
    anchorId: "cBridge",
  },
  {
    imgUrl: "/icons/Bridge/item-1.png",
    isLive: true,
    anchorId: "Polygon Bridge",
  },
  {
    imgUrl: "/icons/Bridge/item-2.png",
    isLive: true,
    anchorId: "Synapse Bridge",
  },
  {
    imgUrl: "/icons/Bridge/item-3.png",
    isLive: false,
    anchorId: "Multichain",
  },
  {
    imgUrl: "/icons/Bridge/item-4.png",
    isLive: false,
    anchorId: "Avalanche Bridge",
  },
  {
    imgUrl: "/icons/Bridge/item-5.png",
    isLive: false,
    anchorId: "Arbitrum Bridge",
  },
  {
    imgUrl: "/icons/Bridge/item-6.png",
    isLive: false,
    anchorId: "Optimism Bridge",
  },
  {
    imgUrl: "/icons/Bridge/item-7.png",
    isLive: false,
    anchorId: "Harmony",
  },
  {
    imgUrl: "/icons/Bridge/item-8.png",
    isLive: false,
    anchorId: "LI.FI",
  },
  {
    imgUrl: "/icons/Bridge/item-9.png",
    isLive: false,
    anchorId: "XY Finance",
  },
];

const wallet = [
  {
    imgUrl: "/icons/Wallets/item.png",
    isLive: true,
    anchorId: "MetaMask",
  },
  {
    imgUrl: "/icons/Wallets/item-1.png",
    isLive: true,
    anchorId: "WalletConnect",
  },
  {
    imgUrl: "/icons/Wallets/item-2.png",
    isLive: true,
    anchorId: "Demon Wallet",
  },
  {
    imgUrl: "/icons/Wallets/item-3.png",
    isLive: true,
    anchorId: "Rainbow Wallet",
  },
  {
    imgUrl: "/icons/Wallets/item-4.png",
    isLive: true,
    anchorId: "Coinbase Wallet",
  },
  {
    imgUrl: "/icons/Wallets/item-5.png",
    isLive: false,
    anchorId: "Phantom Wallet",
  },
  {
    imgUrl: "/icons/Wallets/item-6.png",
    isLive: false,
    anchorId: "Brave Wallet",
  },
  {
    imgUrl: "/icons/Wallets/item-7.png",
    isLive: false,
    anchorId: "SafePal Wallet",
  },
  {
    imgUrl: "/icons/Wallets/item-8.png",
    isLive: false,
    anchorId: "Enjin Wallet",
  },
  {
    imgUrl: "/icons/Wallets/item-9.png",
    isLive: false,
    anchorId: "Edge Wallet",
  },
];

const SupportedPlatformPage = () => {
  return (
    <ParallaxBanner
      className="relative flex flex-col pt-[10rem] pb-[2rem] h-auto justify-between 2xl:min-h-[1200px] items-center gap-11 faded-corners"
      id="supported-platform-section"
    >
      <ParallaxBannerLayer
        expanded={false}
        speed={-20}
        opacity={[0, 1]}
        scale={[1.7, 1]}
      >
        <Grid className="-z-[1] absolute top-[0rem] left-1/2 transform -translate-x-1/2 w-full" />
      </ParallaxBannerLayer>

      <ParallaxBannerLayer
        expanded={false}
        speed={-20}
        opacity={[1, 0]}
        scale={[1.7, 1]}
      >
        <GlowTop className="absolute top-[15rem] left-1/2 transform -translate-x-1/2 w-full sm:w-[40rem] -z-[1]" />
      </ParallaxBannerLayer>
      <h2 className="text-center mobile-h2 sm:tablet-h2 md:web-h2 text-white mb-10">
        Supported Platforms
      </h2>
      <div className="flex flex-col gap-9 lg:gap-20 w-full justify-center items-center max-w-[1400px] px-5 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[1000px] gap-9">
          <div className="flex flex-col justify-center gap-9 p-9 bg-black/8 backdrop-blur-sm rounded-[36px] border-[1px] border-white/8">
            <h4 className="web-h4 text-white text-center">Chains</h4>
            <div className="flex flex-wrap gap-9 justify-center items-center max-w-[390px]">
              {chains.map((data, index) => {
                return (
                  <>
                    <Image
                      src={data.imgUrl}
                      alt={data.imgUrl}
                      id={data.anchorId}
                      key={index}
                      height={36}
                      width={36}
                      className={` ${data.isLive ? "opacity-1" : "opacity-50"}`}
                    />
                    <ReactTooltip
                      anchorId={data.anchorId}
                      place="bottom"
                      content={data.anchorId}
                    />
                  </>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-9 p-9 bg-black/8 backdrop-blur-sm rounded-[36px] border-[1px] border-white/8">
            <h4 className="web-h4 text-white text-center">
              Decentralized Exchanges
            </h4>
            <div className="flex flex-wrap gap-9 justify-center items-center max-w-[390px]">
              {dexs.map((data, index) => {
                return (
                  <>
                    <Image
                      src={data.imgUrl}
                      alt={data.imgUrl}
                      id={data.anchorId}
                      key={index}
                      height={36}
                      width={36}
                      className={` ${data.isLive ? "opacity-1" : "opacity-50"}`}
                    />
                    <ReactTooltip
                      anchorId={data.anchorId}
                      place="bottom"
                      content={data.anchorId}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[1000px] gap-9">
          <div className="flex flex-col justify-center gap-9 p-9 bg-black/8 backdrop-blur-sm rounded-[36px] border-[1px] border-white/8">
            <h4 className="web-h4 text-white text-center">
              Cross-chain Bridges
            </h4>
            <div className="flex flex-wrap gap-9 justify-center items-center max-w-[390px]">
              {bridge.map((data, index) => {
                return (
                  <>
                    <Image
                      src={data.imgUrl}
                      alt={data.imgUrl}
                      id={data.anchorId}
                      key={index}
                      height={36}
                      width={36}
                      className={` ${data.isLive ? "opacity-1" : "opacity-50"}`}
                    />
                    <ReactTooltip
                      anchorId={data.anchorId}
                      place="bottom"
                      content={data.anchorId}
                    />
                  </>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-9 p-9 bg-black/8 backdrop-blur-sm rounded-[36px] border-[1px] border-white/8">
            <h4 className="web-h4 text-white text-center">Crypto Wallets</h4>
            <div className="flex flex-wrap gap-9 justify-center items-center max-w-[390px]">
              {wallet.map((data, index) => {
                return (
                  <>
                    <Image
                      src={data.imgUrl}
                      alt={data.imgUrl}
                      id={data.anchorId}
                      key={index}
                      height={36}
                      width={36}
                      className={` ${data.isLive ? "opacity-1" : "opacity-50"}`}
                    />
                    <ReactTooltip
                      anchorId={data.anchorId}
                      place="bottom"
                      content={data.anchorId}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <TransactionPage />
    </ParallaxBanner>
  );
};

export default SupportedPlatformPage;
