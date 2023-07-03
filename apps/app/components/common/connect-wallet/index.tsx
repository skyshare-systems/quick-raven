import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Squircle } from "corner-smoothing";
import Image from "next/image";
import shortenName from "utils/limit-text";

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
                  <Squircle
                    borderWidth={2}
                    cornerRadius={20}
                    cornerSmoothing={1}
                    className="bg-[#49bdf2] mobile-title sm:tablet-title lg:web-title hover:brightness-125"
                  >
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="flex flex-row items-center rounded-xl px-4 py-4 gap-2"
                    >
                      <Image
                        src={"/icons/wallet-icon.svg"}
                        alt={"wallet"}
                        height={20}
                        width={20}
                      />
                      Connect
                    </button>
                  </Squircle>
                );
              }

              if (chain.unsupported) {
                return (
                  <Squircle
                    borderWidth={2}
                    cornerRadius={10}
                    cornerSmoothing={1}
                    className="bg-[#fc0002] mobile-title sm:tablet-title lg:web-title hover:opacity-50 duration-75"
                  >
                    <button
                      onClick={openChainModal}
                      className="flex flex-row items-center rounded-xl px-3 py-3 gap-2  text-white mobile-title sm:tablet-title lg:web-title hover:brightness-125"
                      type="button"
                    >
                      Wrong network
                    </button>
                  </Squircle>
                );
              }
              // Network Selected
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Squircle
                    borderWidth={2}
                    cornerRadius={30}
                    cornerSmoothing={1}
                    className="bg-white/8 hover:brightness-125 hover:bg-white/16 duration-75"
                  >
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="flex flex-row items-center justify-center rounded-xl px-4 py-3 gap-2"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: "#201c26",
                            width: 25,
                            height: 25,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              src={chain.iconUrl}
                              alt={chain.name ?? "Chain icon"}
                              width={25}
                              height={25}
                            />
                          )}
                        </div>
                      )}
                      <span className="hidden sm:flex mobile-title sm:tablet-title lg:web-title uppercase text-white">
                        {shortenName(chain.name ?? "")}
                      </span>

                      <Image
                        src={"/icons/revamp-icon/dropdown-icon.svg"}
                        alt={"wallet"}
                        height={20}
                        width={20}
                        className="hidden sm:flex"
                      />
                    </button>
                  </Squircle>
                  <Squircle
                    borderWidth={2}
                    cornerRadius={20}
                    cornerSmoothing={1}
                    className="bg-[#49bdf2] mobile-title sm:tablet-title lg:web-title hover:brightness-125 duration-75"
                  >
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="flex flex-row items-center gap-2 h-full w-full cursor-pointer px-4 sm:px-3 py-2 sm:py-3"
                    >
                      <Image
                        src={"/icons/wallet-icon.svg"}
                        alt={"wallet"}
                        height={20}
                        width={20}
                      />
                      <span className="hidden sm:flex">
                        {account.displayName}
                      </span>
                    </button>
                  </Squircle>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
