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
import React from "react";

const { chains, publicClient } = configureChains(
  [
    polygonMumbai,
    // bscTestnet,
    // avalancheFuji,
    // bscTestnet, gnosisChiado
  ],
  [
    alchemyProvider({
      apiKey: "rLc98yWplzZqRlAZwg9RwiT-PMM0BKXi",
    }),
    // publicProvider(),
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
