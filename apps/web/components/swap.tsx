"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 0, transition: { duration: 0.2 } },
};

const SwapPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);

  return (
    <section className="relative flex flex-row justify-center items-center min-h-[100vh] max-h-[100vh]">
      <div className="hidden md:flex fixed bg-gradial-gradient-v2 h-full w-full -z-[1] opacity-50" />
      <div className="flex flex-col justify-center items-center gap-3 border-[1px] border-[#3b3b3b] bg-radial rounded-xl text-white px-[12px] py-[16px] w-full max-w-[500px]">
        <div className="flex flex-row justify-between w-full py-1">
          <h1 className="mobile-title sm:tablet-title lg:web-title grow">
            Swap
          </h1>
          <div className="cursor-pointer">
            <Image
              src={"/icons/refresh-icon.svg"}
              alt={"refresh"}
              height={15}
              width={15}
            />
          </div>
        </div>
        <div className="relative flex flex-col w-full gap-3">
          <div className="center-absolute cursor-pointer">
            <Image
              src={"/icons/switch-icon.svg"}
              alt={"refresh"}
              height={50}
              width={50}
            />
          </div>
          <div className="flex flex-row justify-between grow gap-5 px-[1rem] border-[1px] border-[#3b3b3b] py-3 rounded-xl ">
            <input
              type="number"
              id="fname"
              name="fname"
              placeholder="0.00"
              className="w-full lg:grow bg-transparent"
            />
            <button className="flex flex-row items-center gap-2  bg-[#1b181c] border-2 rounded-full border-[#3b3b3b] px-3 py-3 hover:brightness-125">
              <Image
                src={"/icons/tether-icon.svg"}
                alt={"refresh"}
                height={55}
                width={55}
              />
              <p className="text-sm sm:mobile-h3">USDT</p>
              <Image
                src={"/icons/dropdown-icon.svg"}
                alt={"refresh"}
                height={60}
                width={60}
              />
            </button>
          </div>

          <div className="flex flex-row justify-between grow gap-5 px-[1rem] border-[1px] border-[#3b3b3b] py-3 rounded-xl ">
            <input
              type="number"
              id="fname"
              name="fname"
              placeholder="0.00"
              className="w-full lg:grow bg-transparent"
            />
            <button className="flex flex-row items-center gap-2  bg-[#1b181c] border-2 rounded-full border-[#3b3b3b] px-3 py-3 hover:brightness-125">
              <Image
                src={"/icons/tether-icon.svg"}
                alt={"refresh"}
                height={55}
                width={55}
              />
              <p className="text-sm sm:mobile-h3">USDT</p>
              <Image
                src={"/icons/dropdown-icon.svg"}
                alt={"refresh"}
                height={60}
                width={60}
              />
            </button>
          </div>
        </div>
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className="flex flex-col justify-between w-full"
        >
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-row items-center justify-between grow border-[1px] border-[#474747] bg-[#141414] rounded-xl py-2 px-3"
          >
            <div className="flex flex-row items-center gap-2">
              {/* Token 1 */}
              <p className="mobile-description sm:tablet-description lg:web-description">
                1 USDT
              </p>
              <Image
                src={"/icons/equals-icon.svg"}
                alt={"dropdown"}
                height={12}
                width={12}
              />
              {/* Token-2 */}
              <p className="mobile-description sm:tablet-description lg:web-description">
                1 AXS
              </p>
              {/* Equivalent */}
              <p className="mobile-description sm:tablet-description lg:web-description text-[#7a7a7a]">
                ($6.78)
              </p>
            </div>
            {/* Gas Fees  */}
            <div className="flex flex-row items-center gap-4">
              <div className="flex gap-2">
                <Image
                  src={"/icons/gas-fee-icon.svg"}
                  alt={"dropdown"}
                  height={15}
                  width={15}
                />
                $12.47
              </div>

              <motion.div
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.3 }}
                style={{ originY: 0.55 }}
              >
                <Image
                  src={"/icons/dropdown-icon-v2.svg"}
                  alt={"dropdown"}
                  height={12}
                  width={20}
                  className="rotate-180"
                />
              </motion.div>
            </div>
          </motion.button>
          <motion.ul
            variants={{
              open: {
                clipPath: "inset(0% 0% 0% 0%)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3,
                  delayChildren: 0.1,
                  staggerChildren: 0.05,
                },
              },
              closed: {
                clipPath: "inset(10% 50% 90% 50%)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3,
                  delayChildren: 0.1,
                },
              },
            }}
            className={`duration-300 transition ${
              isOpen ? "flex flex-col" : "hidden"
            }`}
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
          >
            <motion.li
              variants={itemVariants}
              className="flex flex-col justify-center bg-[#212121] border-[1px] border-[#474747] my-2 rounded-xl px-3 py-5 gap-4"
            >
              <div className="flex flex-row">
                <div className="flex flex-col justify-center gap-2 grow">
                  <div className="flex flex-row items-center gap-2">
                    <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#7a7a7a]">
                      Default Pathway
                    </p>
                    <Image
                      src={"/icons/info-icon.svg"}
                      alt={"dropdown"}
                      height={12}
                      width={20}
                    />
                  </div>
                  <div className="flex flex-row gap-2">
                    <button className="flex items-center gap-2 text-black mobile-subtitle sm:tablet-subtitle lg:web-subtitle bg-[#1cef5f] px-4 py-2 rounded-full">
                      <Image
                        src={"/icons/fastest-icon.svg"}
                        alt={"dropdown"}
                        height={15}
                        width={15}
                      />
                      Fastest
                    </button>
                    <button className="flex items-center gap-2 text-white mobile-subtitle sm:tablet-subtitle lg:web-subtitle bg-[#2e2e2e] px-4 py-2 rounded-full">
                      <Image
                        src={"/icons/cheapest-icon.svg"}
                        alt={"dropdown"}
                        height={15}
                        width={15}
                      />
                      Cheapest
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#7a7a7a]">
                    Slippage Tolerance
                  </p>
                  <div className="flex justify-end">
                    <button className="flex items-center gap-2 text-white mobile-subtitle w-auto sm:tablet-subtitle lg:web-subtitle bg-[#2e2e2e] px-4 py-3 rounded-xl">
                      3.00%
                      <Image
                        src={"/icons/edit-icon.svg"}
                        alt={"dropdown"}
                        height={15}
                        width={15}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <hr className="border-[#474747]" />

              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#7a7a7a]">
                    Estimated Time:
                  </p>
                  <p className="mobile-description sm:tablet-description lg:web-description text-white">
                    15 minutes
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#7a7a7a]">
                    Birdge Fee:
                  </p>
                  <p className="mobile-description sm:tablet-description lg:web-description text-white">
                    2.50 USDT
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#7a7a7a]">
                    Estimated Gas Cost:
                  </p>
                  <p className="mobile-description sm:tablet-description lg:web-description text-white">
                    12.47 USDT
                  </p>
                </div>
              </div>
            </motion.li>
          </motion.ul>
        </motion.nav>
        {isNetworkError && (
          <div className="px-[1rem] py-[13px] flex flex-row justify-center items-center bg-[#534506] rounded-xl gap-5">
            <Image
              src={"/icons/warning-icon.svg"}
              alt={"dropdown"}
              height={35}
              width={35}
            />
            <p className="mobile-overline sm:tablet-overline lg:web-overline grow">
              Polygon Network is currently having a heavy network traffic.
              Transactions may be delayed.
            </p>
          </div>
        )}

        <button className="mobile-title sm:tablet-title lg:web-title bg-radial-button w-full px-2 py-5 rounded-xl text-black cursor-pointer duration-300 hover:brightness-75">
          Swap Now
        </button>
      </div>
    </section>
  );
};

export default SwapPage;
