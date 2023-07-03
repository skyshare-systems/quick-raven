import { ConnectButton } from "@rainbow-me/rainbowkit";

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
                    className={`flex flex-row items-center gap-3 w-full max-w-[160px] bg-[#636b79]/20  rounded-full  px-4 py-3 hover:brightness-150 duration-300`}
                  >
                    <p className="mobile-title py-1 sm:tablet-title lg:web-title text-[#D3DAE6]">
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
