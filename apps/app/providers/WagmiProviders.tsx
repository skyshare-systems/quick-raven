"use client";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  darkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygonMumbai,
  bscTestnet,
  gnosisChiado,
  polygon,
  avalancheFuji,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import React from "react";

const { chains, publicClient } = configureChains(
  [
    polygonMumbai,
    avalancheFuji,
    // bscTestnet, gnosisChiado
  ],
  [
    // alchemyProvider({
    //   apiKey:
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImIyYTA3ZjJkLTAyNzMtNDdkOS04YjQzLWY4NDg5MTA5NWVkMCIsIm9yZ0lkIjoiMzM0NTE0IiwidXNlcklkIjoiMzQzOTQwIiwidHlwZUlkIjoiNDBiNzlkNGItYWQ1MC00NjQ2LThmZWQtYzk0YWJhY2JhNmFmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODQ0MDk1MjAsImV4cCI6NDg0MDE2OTUyMH0.ZpHJvU0X6g8hSbsEcVmwhtI39LSO7BKXyCqS8tIMn-0",
    // }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Quick Raven",
  projectId: "QUICK_RAVEN",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

interface Rainbow {
  children: any;
}

const WagmiProviders = ({ children }: Rainbow) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={darkTheme({
          accentColor: "#49bdf2",
          accentColorForeground: "#031d2a",
          borderRadius: "large",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WagmiProviders;
