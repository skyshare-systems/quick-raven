import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Squircle } from "corner-smoothing";
import Image from "next/image";
import shortenName from "utils/limit-text";

export const ConnectWalletSwap = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <>
            {" "}
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="flex flex-row justify-center items-center rounded-xl px-4 py-5 gap-2 bg-white text-black mobile-title uppercase sm:tablet-title lg:web-title hover:brightness-50 duration-150 w-full"
                  >
                    Connect Wallet
                  </button>
                );
              }
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
