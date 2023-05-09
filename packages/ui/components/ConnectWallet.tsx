"use client";
import { useEffect, useState } from "react";
import { Button } from "ui/components";

import { useAccount, useConnect, goerli, mainnet } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import shortenAddress from "ui/utils/helpers/shortenAddress";
import Image from "next/image";

const ConnectWallet = () => {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connect } = useConnect({
    chainId:
      process.env.NEXT_PUBLIC_ENV === "development" ? goerli.id : mainnet.id,
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
      {isConnected && activeConnector ? (
        <>
          <Button
            variant="transparent"
            disabled={true}
            className="flex items-center gap-2 font-[Switzer-Regular] py-[0.6rem] px-[1.2rem]"
          >
            {shortenAddress(address?.toString() ?? "")}
          </Button>
        </>
      ) : (
        <Button
          variant="transparent"
          className="flex items-center gap-2 font-[Switzer-Regular] py-[0.6rem] px-[1.2rem]"
          onClick={handleConnectWallet}
        >
          <Image
            src={"/assets/navbar/vector-small.svg"}
            className="group-hover:opacity-100 group-focus:opacity-100 pointer-events-none select-none opacity-50 image-title"
            alt="text"
            width={20}
            height={20}
          />
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default ConnectWallet;
