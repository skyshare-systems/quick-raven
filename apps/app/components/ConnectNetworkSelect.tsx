import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export const ConnectNetworkSelect = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
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
                    onClick={openConnectModal}
                    type="button"
                    className={`flex flex-row items-center gap-2  bg-[#1b181c] text-[#7a7a7a] border-2 rounded-full border-[#3b3b3b] px-3 py-2`}
                  >
                    Select Network
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
