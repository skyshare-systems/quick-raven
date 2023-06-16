"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectWallet } from "../common/ConnectWallet";
import ModalTutorialPage from "../tutorial/modal-tutorial";

const NavbarPage = () => {
  const [showTutorial, setShowTutorial] = React.useState(false);

  return (
    <>
      <ModalTutorialPage
        isOpen={showTutorial}
        onClose={() => setShowTutorial(!showTutorial)}
      />
      <nav className="fixed top-0 flex flex-row justify-center items-center backdrop-filter z-[4] w-full">
        <div className="flex flex-row justify-between max-w-[80rem] xsm:px-5 lg:px-0 py-4 grow">
          {" "}
          <ul className="flex flex-row items-center gap-5 md:gap-11">
            <Link href="/">
              <Image
                src={"/assets/logo-with-letter.svg"}
                alt={"logo"}
                height={200}
                width={200}
                className="hidden lg:flex"
              />
              <Image
                src={"/assets/logo.svg"}
                alt={"logo"}
                height={40}
                width={40}
                className="flex lg:hidden"
              />
            </Link>
            <Link href="/">
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
            <Link href="/">
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
                src={"/icons/whitepaper-icon.svg"}
                alt={"logo"}
                height={15}
                width={15}
                className="flex lg:hidden"
              />
            </Link>
          </ul>
          {/* <ConnectButton showBalance={false} label="Connect" /> */}
          <ConnectWallet />
        </div>
      </nav>
    </>
  );
};

export default NavbarPage;
