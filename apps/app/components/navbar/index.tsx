"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { ConnectWallet } from "components/common/connect-wallet";
import { useSwitchColorBg } from "lib/stores.ts/stores";
import { usePathname } from "next/navigation";
import ModalTutorialPage from "components/tutorial";
const NavbarPage = () => {
  const route = usePathname();
  const [showTutorial, setShowTutorial] = React.useState(false);

  const { bgColor, updateBgColor } = useSwitchColorBg((state) => state);

  useEffect(() => {
    if (route === "/renec-bridge") setShowTutorial(false);
  }, [route]);
  return (
    <>
      <ModalTutorialPage
        isOpen={showTutorial}
        onClose={() => setShowTutorial(!showTutorial)}
      />

      <nav className="fixed top-0 flex flex-row justify-center items-center backdrop-filter z-[4] w-full">
        <div className="flex flex-row justify-between max-w-[80rem] xsm:px-5 lg:px-0 py-4 grow">
          {" "}
          <ul className="flex flex-row items-center gap-5 md:gap-8">
            <Link href="/">
              <Image
                src={"/assets/logo-with-text.webp"}
                alt={"logo"}
                height={200}
                width={200}
                className="hidden lg:flex"
              />
              <Image
                src={"/assets/logo.webp"}
                alt={"logo"}
                height={40}
                width={40}
                className="flex lg:hidden"
              />
            </Link>
            <Link href="/">
              <div
                className="cursor-pointer"
                onClick={() =>
                  updateBgColor("bg-radial-evm", "multi-chain-swap")
                }
              >
                <p className="hidden text-white mobile-title sm:tablet-title lg:web-title lg:flex">
                  Home
                </p>
                <Image
                  src={"/icons/home-icon.svg"}
                  alt={"logo"}
                  height={18}
                  width={18}
                  className="flex lg:hidden"
                />
              </div>
            </Link>
            <Link href="/">
              <p className="hidden text-white mobile-title sm:tablet-title lg:web-title lg:flex">
                Whitepaper
              </p>
              <Image
                src={"/icons/whitepaper-icon.svg"}
                alt={"logo"}
                height={15}
                width={15}
                className="flex lg:hidden"
              />
            </Link>

            {bgColor === "bg-radial-evm" && (
              <div
                onClick={() => setShowTutorial(!showTutorial)}
                className="cursor-pointer"
              >
                <p className="hidden text-white mobile-title sm:tablet-title lg:web-title lg:flex">
                  Set Up Testnet
                </p>
                <Image
                  src={"/icons/test-net-icon.svg"}
                  alt={"logo"}
                  height={15}
                  width={15}
                  className="flex lg:hidden"
                />
              </div>
            )}

            {/* <Link href="/renec-bridge">
              <div
                className="cursor-pointer"
                onClick={() => updateBgColor("bg-radial-renec", "renec-bridge")}
              >
                <p className="flex-row gap-2 hidden text-white mobile-title sm:tablet-title lg:web-title lg:flex">
                  <Image
                    src={"/icons/star-icon.svg"}
                    alt={"logo"}
                    height={15}
                    width={15}
                    className="flex"
                  />
                  Renec Bridge
                </p>
                <Image
                  src={"/icons/star-icon.svg"}
                  alt={"logo"}
                  height={15}
                  width={15}
                  className="flex lg:hidden"
                />
              </div>
            </Link> */}
          </ul>
          {/* <ConnectButton showBalance={false} label="Connect" /> */}
          <ConnectWallet />
        </div>
      </nav>
    </>
  );
};

export default NavbarPage;
