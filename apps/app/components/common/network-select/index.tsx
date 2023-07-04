"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNetworkInit } from "lib/stores.ts/stores";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSwitchNetwork } from "wagmi";

export const ConnectNetworkSelect = () => {
  const [name, setName] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");

  const { updateNetwork: updateNetworkInit } = useNetworkInit((state) => state);
  const { isLoading, isSuccess } = useSwitchNetwork();

  useEffect(() => {
    updateNetworkInit(name, imgUrl, "");
  }, [isSuccess]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        function handleClick(chainName: string, iconUrl: string) {
          openConnectModal();
          updateNetworkInit(chainName, iconUrl, "");
        }

        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={() =>
                      handleClick(chain?.name ?? "", chain?.iconUrl ?? "")
                    }
                    type="button"
                    className={`flex flex-row items-center gap-3 w-full max-w-[160px] bg-[#1b181c] border-[1px] rounded-full border-[#3b3b3b] px-5 py-2 hover:brightness-150 duration-300`}
                  >
                    <p className="mobile-title py-1 sm:tablet-title lg:web-title text-[#7a7a7a]">
                      Select Network
                    </p>
                  </button>
                );
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
