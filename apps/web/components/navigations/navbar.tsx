"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const NavbarPage = () => {
  const [showTutorial, setShowTutorial] = React.useState(false);

  return (
    <>
      <nav className="fixed top-0 flex flex-row justify-center items-center backdrop-filter backdrop-blur-md z-[4] w-full bg-black/10 px-5 lg:px-0">
        <div className="flex flex-row justify-between max-w-[80rem] xsm:px-5 lg:px-0 py-4 grow">
          {" "}
          <ul className="flex flex-row items-center gap-5 md:gap-11">
            <Link href="/">
              <Image
                src={"/assets/logo.svg"}
                alt={"logo"}
                height={40}
                width={40}
              />
            </Link>
            <Link href="/">
              <p className="hidden text-white mobile-title sm:tablet-title lg:web-title md:flex">
                Home
              </p>
              <Image
                src={"/icons/home-icon.svg"}
                alt={"logo"}
                height={18}
                width={18}
                className="flex md:hidden"
              />
            </Link>
            <Link href="https://medium.com/@quickraven" target="_blank">
              <p className="hidden text-white mobile-title sm:tablet-title lg:web-title md:flex">
                Whitepaper
              </p>
              <Image
                src={"/icons/whitepaper-icon.svg"}
                alt={"logo"}
                height={15}
                width={15}
                className="flex md:hidden"
              />
            </Link>
            <div
              onClick={() => setShowTutorial(!showTutorial)}
              className="cursor-pointer"
            >
              <p className="hidden text-white mobile-title sm:tablet-title lg:web-title md:flex">
                Join waitlist
              </p>

              <Image
                src={"/icons/user-clock-solid.svg"}
                alt={"logo"}
                height={20}
                width={20}
                className="flex md:hidden "
              />
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavbarPage;
