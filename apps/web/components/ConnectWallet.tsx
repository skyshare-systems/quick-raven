import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export const ConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
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
                    className="flex flex-row items-center rounded-xl px-3 py-3 gap-2 bg-[#49bdf2] mobile-title sm:tablet-title lg:web-title hover:brightness-125"
                  >
                    <Image
                      src={"/icons/wallet-icon.svg"}
                      alt={"wallet"}
                      height={20}
                      width={20}
                    />
                    Connect
                    <Image
                      src={"/icons/dropdown-icon.svg"}
                      alt={"wallet"}
                      height={20}
                      width={20}
                    />
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="flex flex-row items-center rounded-xl px-3 py-3 gap-2 bg-[#fc0002] text-white mobile-title sm:tablet-title lg:web-title hover:brightness-125"
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  {/* <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex flex-row items-center rounded-xl px-3 py-3 gap-2 bg-[#49bdf2] mobile-title sm:tablet-title lg:web-title hover:brightness-125"
                  >
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""} */}
                    <Image
                      src={"/icons/dropdown-icon.svg"}
                      alt={"wallet"}
                      height={20}
                      width={20}
                    />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
