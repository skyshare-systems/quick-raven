import React, { useEffect, useState } from "react";
import Image from "next/image";

const availabletokens = [
  {
    id: 1,
    name: "BTC",
    imgUrl: "/icons/available-coins/btc-icon.svg",
    width: "max-w-[90px]",
  },
  {
    id: 2,
    name: "ETH",
    imgUrl: "/icons/available-coins/eth-icon.svg",
    width: "max-w-[90px]",
  },
  {
    id: 3,
    name: "BNB",
    imgUrl: "/icons/available-coins/bnb-icon.svg",
    width: "max-w-[90px]",
  },
  {
    id: 4,
    name: "USDT",
    imgUrl: "/icons/available-coins/usdt-icon.svg",
    width: "max-w-[140px]",
  },
  {
    id: 5,
    name: "USDC",
    imgUrl: "/icons/available-coins/usdc-icon.svg",
    width: "max-w-[140px]",
  },
  {
    id: 6,
    name: "XRP",
    imgUrl: "/icons/available-coins/xrp-icon.svg",
    width: "max-w-[140px]",
  },
  {
    id: 7,
    name: "ADA",
    imgUrl: "/icons/available-coins/ada-icon.svg",
    width: "max-w-[140px]",
  },
  {
    id: 8,
    name: "DOGE",
    imgUrl: "/icons/available-coins/doge-icon.svg",
    width: "max-w-[140px]",
  },
  {
    id: 9,
    name: "MATIC",
    imgUrl: "/icons/available-coins/matic-icon.svg",
    width: "max-w-[140px]",
  },
  {
    id: 10,
    name: "SOL",
    imgUrl: "/icons/available-coins/sol-icon.svg",
    width: "max-w-[140px]",
  },
];

const chains = [
  {
    id: 1,
    name: "Polygon",
    imgUrl: "/icons/chains/polygon-icon.svg",
    width: "max-w-[140px]",
    isLive: true,
  },
  {
    id: 2,
    name: "BNB Chain",
    imgUrl: "/icons/chains/bnb-icon.svg",
    width: "max-w-[140px]",
    isLive: true,
  },
  {
    id: 3,
    name: "Ethereum",
    imgUrl: "/icons/chains/eth-icon.svg",
    width: "max-w-[140px]",
    isLive: true,
  },
  {
    id: 4,
    name: "Solana",
    imgUrl: "/icons/chains/solana-icon.svg",
    width: "max-w-[140px]",
    isLive: true,
  },
  {
    id: 5,
    name: "Avalanche",
    imgUrl: "/icons/chains/avalanche-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 6,
    name: "Fantom",
    imgUrl: "/icons/chains/fantom-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 7,
    name: "Arbitrium",
    imgUrl: "/icons/chains/arbitrium-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 8,
    name: "Optimism",
    imgUrl: "/icons/chains/optimism-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 9,
    name: "zkSync",
    imgUrl: "/icons/chains/zkSync-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 10,
    name: "Cronos",
    imgUrl: "/icons/chains/cronos-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
];

const decentralizedexchange = [
  {
    id: 1,
    name: "Uniswap",
    imgUrl: "/icons/decentralized-exchange/uniswap-icon.svg",
    width: "max-w-[140px]",
    isLive: true,
  },
  {
    id: 2,
    name: "SushiSwap",
    imgUrl: "/icons/decentralized-exchange/sushi-swap-icon.svg",
    width: "max-w-[140px]",
    isLive: true,
  },
  {
    id: 3,
    name: "PancakeSwap",
    imgUrl: "/icons/decentralized-exchange/pancake-swap-icon.svg",
    width: "max-w-[160px]",
    isLive: true,
  },
  {
    id: 4,
    name: "Curve",
    imgUrl: "/icons/decentralized-exchange/curve-icon.svg",
    width: "max-w-[120px]",
    isLive: true,
  },
  {
    id: 5,
    name: "Clipper",
    imgUrl: "/icons/decentralized-exchange/clipper-icon.svg",
    width: "max-w-[120px]",
    isLive: false,
  },
  {
    id: 6,
    name: "ApeSwap",
    imgUrl: "/icons/decentralized-exchange/ape-swap-icon.svg",
    width: "max-w-[160px]",
    isLive: false,
  },
  {
    id: 7,
    name: "WOOFI",
    imgUrl: "/icons/decentralized-exchange/woofi-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 8,
    name: "Hashflow",
    imgUrl: "/icons/decentralized-exchange/hashflow-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 9,
    name: "DODO",
    imgUrl: "/icons/decentralized-exchange/dodo-icon.svg",
    width: "max-w-[120px]",
    isLive: false,
  },
  {
    id: 10,
    name: "QuickSwap",
    imgUrl: "/icons/decentralized-exchange/quick-swap-icon.svg",
    width: "max-w-[160px]",
    isLive: false,
  },
];

const crosschainbridge = [
  {
    id: 1,
    name: "Celer",
    imgUrl: "/icons/cross-chain-bridge/celer-icon.svg",
    width: "max-w-[140px]",
    isLive: true,
  },
  {
    id: 2,
    name: "Matic",
    imgUrl: "/icons/cross-chain-bridge/matic-icon.svg",
    width: "max-w-[140px]",
    isLive: true,
  },
  {
    id: 3,
    name: "Synapse",
    imgUrl: "/icons/cross-chain-bridge/synapse-icon.svg",
    width: "max-w-[140px]",
    isLive: true,
  },
  {
    id: 4,
    name: "Multichain",
    imgUrl: "/icons/cross-chain-bridge/multichain-icon.svg",
    width: "max-w-[140px]",
    isLive: true,
  },
  {
    id: 5,
    name: "AB Bridge",
    imgUrl: "/icons/cross-chain-bridge/ab-bridge-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 6,
    name: "Arbitrum",
    imgUrl: "/icons/cross-chain-bridge/arbitrum-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 7,
    name: "Optimism",
    imgUrl: "/icons/cross-chain-bridge/optimism-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 8,
    name: "Harmony",
    imgUrl: "/icons/cross-chain-bridge/harmony-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 9,
    name: "L.I.FI Bridge",
    imgUrl: "/icons/cross-chain-bridge/li-fi-bridge-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
  {
    id: 10,
    name: "XY Finance",
    imgUrl: "/icons/cross-chain-bridge/xy-finance-icon.svg",
    width: "max-w-[140px]",
    isLive: false,
  },
];

const SupportedPlatformPage = () => {
  const [triggerID, setTriggerID] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTriggerID((prevCount) => prevCount + 1);
    }, 2250);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (triggerID > 4) {
      setTriggerID(1);
    }
  }, [triggerID]);

  return (
    <div
      className="relative flex flex-col py-[1rem] h-auto justify-center items-center gap-5"
      id="supported-platform-section"
    >
      <h2 className="text-center mobile-h2 sm:tablet-h2 md:web-h2 text-white">
        Supported Platforms
      </h2>
      <div className="flex flex-wrap gap-11 w-full justify-center items-start max-w-[1400px] px-5 lg:px-0">
        <div
          className={`flex flex-col items-center gap-5  w-full max-w-[300px] duration-1000 ${
            triggerID === 1 ? "opacity-100" : "opacity-50"
          }`}
        >
          <h4
            className={`relative flex flex-col items-center mobile-h4 sm:tablet-h4 md:web-h4 ${
              triggerID === 1
                ? "text-transparent bg-clip-text bg-gradient-to-t from-[#1decdd] to-[#1dc78c]"
                : "text-white"
            } mb-5`}
          >
            Available Tokens
            <Image
              src={"/assets/supported-platforms/line.svg"}
              alt={"line"}
              width={100}
              height={10}
              className={`absolute top-5 duration-1000 ${
                triggerID === 1 ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src={"/assets/supported-platforms/glow-supported-platform.svg"}
              alt={"line"}
              width={100}
              height={10}
              className={`absolute top-5 duration-1000 -z-[1] ${
                triggerID === 1 ? "opacity-100" : "opacity-0"
              }`}
            />
          </h4>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {availabletokens.map((data, index) => {
              return (
                <button
                  key={index}
                  className={`flex flex-row items-center px-3 py-3 border-[2px] ${
                    triggerID === 1
                      ? "border-[#063b53] bg-[#063b53]/40"
                      : "border-[#1c1c1c]"
                  } rounded-xl w-full ${data.width}  text-white gap-2`}
                  disabled
                >
                  <Image
                    src={data.imgUrl}
                    alt={"hero"}
                    width={20}
                    height={20}
                  />
                  {data.name}
                </button>
              );
            })}
            <button
              className={`flex flex-row items-center px-3 py-3 border-[2px] rounded-xl ${
                triggerID === 1
                  ? "border-[#063b53] bg-[#063b53]/40"
                  : "border-[#1c1c1c]"
              } w-full max-w-[140px]  text-white gap-2`}
            >
              + 22K more
            </button>
          </div>
        </div>

        <div
          className={`flex flex-col items-center gap-5  w-full max-w-[300px] duration-1000 ${
            triggerID === 2 ? "opacity-100" : "opacity-50"
          }`}
        >
          <h4
            className={`relative flex flex-col items-center mobile-h4 sm:tablet-h4 md:web-h4 ${
              triggerID === 2
                ? "text-transparent bg-clip-text bg-gradient-to-t from-[#1decdd] to-[#1dc78c]"
                : "text-white"
            } mb-5 w-20`}
          >
            Chains
            <Image
              src={"/assets/supported-platforms/line.svg"}
              alt={"line"}
              width={300}
              height={20}
              className={`absolute top-5 w-full duration-1000 ${
                triggerID === 2 ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src={"/assets/supported-platforms/glow-supported-platform.svg"}
              alt={"line"}
              width={100}
              height={10}
              className={`absolute top-5 duration-1000 -z-[1] ${
                triggerID === 2 ? "opacity-100" : "opacity-0"
              }`}
            />
          </h4>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {chains.map((data, index) => {
              return (
                <button
                  key={index}
                  className={`flex flex-row items-center px-3 py-3 border-[2px] ${
                    triggerID === 2 && data.isLive === true
                      ? "border-[#063b53] bg-[#063b53]/40"
                      : "border-[#1c1c1c]"
                  } rounded-xl w-full ${data.width} ${
                    data.isLive === false && "blur-sm"
                  }  text-white gap-2`}
                  disabled
                >
                  <Image
                    src={data.imgUrl}
                    alt={"hero"}
                    width={20}
                    height={20}
                  />
                  {data.name}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`flex flex-col items-center gap-5  w-full max-w-[300px] duration-1000 ${
            triggerID === 3 ? "opacity-100" : "opacity-50"
          }`}
        >
          <h4
            className={`relative flex flex-col items-center mobile-h4 sm:tablet-h4 md:web-h4 ${
              triggerID === 3
                ? "text-transparent bg-clip-text bg-gradient-to-t from-[#1decdd] to-[#1dc78c]"
                : "text-white"
            } mb-5`}
          >
            Decentralized Exchanges
            <Image
              src={"/assets/supported-platforms/line.svg"}
              alt={"line"}
              width={100}
              height={10}
              className={`absolute top-5 duration-1000 ${
                triggerID === 3 ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src={"/assets/supported-platforms/glow-supported-platform.svg"}
              alt={"line"}
              width={100}
              height={10}
              className={`absolute top-5 duration-1000 -z-[1] ${
                triggerID === 3 ? "opacity-100" : "opacity-0"
              }`}
            />
          </h4>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {decentralizedexchange.map((data, index) => {
              return (
                <button
                  key={index}
                  className={`flex flex-row items-center px-3 py-3 ${
                    triggerID === 3 && data.isLive === true
                      ? "border-[#063b53] bg-[#063b53]/40"
                      : "border-[#1c1c1c]"
                  } border-[2px] rounded-xl w-full ${data.width} ${
                    data.isLive === false && "blur-sm"
                  }  text-white gap-2`}
                  disabled
                >
                  <Image
                    src={data.imgUrl}
                    alt={"hero"}
                    width={20}
                    height={20}
                  />
                  {data.name}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`flex flex-col items-center gap-5  w-full max-w-[300px] duration-1000 ${
            triggerID === 4 ? "opacity-100" : "opacity-50"
          } `}
        >
          <h4
            className={`relative flex flex-col items-center mobile-h4 sm:tablet-h4 md:web-h4 ${
              triggerID === 4
                ? "text-transparent bg-clip-text bg-gradient-to-t from-[#1decdd] to-[#1dc78c]"
                : "text-white"
            } mb-5`}
          >
            Cross-Chain Bridges
            <Image
              src={"/assets/supported-platforms/line.svg"}
              alt={"line"}
              width={100}
              height={10}
              className={`absolute top-5 duration-1000 ${
                triggerID === 4 ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src={"/assets/supported-platforms/glow-supported-platform.svg"}
              alt={"line"}
              width={100}
              height={10}
              className={`absolute top-5 duration-1000 -z-[1] ${
                triggerID === 4 ? "opacity-100" : "opacity-0"
              }`}
            />
          </h4>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {crosschainbridge.map((data, index) => {
              return (
                <button
                  key={index}
                  className={`flex flex-row items-center px-3 py-3 ${
                    triggerID === 4 && data.isLive === true
                      ? "border-[#063b53] bg-[#063b53]/40"
                      : "border-[#1c1c1c]"
                  } border-[2px] rounded-xl w-full ${data.width} ${
                    data.isLive === false && "blur-sm"
                  }  text-white gap-2`}
                  disabled
                >
                  <Image
                    src={data.imgUrl}
                    alt={"hero"}
                    width={20}
                    height={20}
                  />
                  {data.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportedPlatformPage;
