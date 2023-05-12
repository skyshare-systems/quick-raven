"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { mainnet, polygonMumbai } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import shortenAddress from "ui/utils/helpers/shortenAddress";

const ConnectWallet = () => {
  const {
    connector: activeConnector,
    isConnected,
    address,
    status,
  } = useAccount();
  const { connect } = useConnect({
    chainId: mainnet.id,
  });

  const [connector, setConnector] = useState<MetaMaskConnector>();

  const handleConnectWallet = () => {
    connect({ connector });
  };

  useEffect(() => {
    setConnector(new MetaMaskConnector());
  }, []);

  return (
    <>
      {isConnected && activeConnector && status === "connected" ? (
        <button disabled={true} className="p-2 px-4 bg-pink-500 ">
          {shortenAddress(address?.toString() ?? "")}
        </button>
      ) : (
        <button onClick={handleConnectWallet} className="p-2 px-4 bg-pink-500 ">
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default ConnectWallet;
