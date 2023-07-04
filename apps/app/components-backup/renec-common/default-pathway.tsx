import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 0, transition: { duration: 0.2 } },
};

const DefaultPathwayPage = ({ isOpen }: any) => {
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="flex flex-col justify-between w-full"
    >
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
          className="flex flex-col justify-center bg-[#0d1624]/30 border-[1px] border-[#363e4d] my-2 rounded-xl px-3 py-5 gap-4"
        >
          <div className="flex flex-col gap-2 xsm:flex-row">
            <div className="flex flex-col justify-center gap-2 grow">
              <div className="flex flex-row items-center justify-center gap-2 xsm:justify-start">
                <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#636B79]">
                  Default Pathway
                </p>
                <Image
                  src={"/icons/info-icon.svg"}
                  alt={"dropdown"}
                  height={12}
                  width={20}
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2 xsm:justify-start xsm:flex-row">
                <button className="flex items-center gap-2 text-black mobile-subtitle sm:tablet-subtitle lg:web-subtitle bg-[#1cef5f] px-4 py-2 rounded-full ">
                  <Image
                    src={"/icons/fastest-icon.svg"}
                    alt={"dropdown"}
                    height={15}
                    width={15}
                  />
                  Fastest
                </button>
                <button className="flex items-center gap-2 text-[#D3DAE6] mobile-subtitle sm:tablet-subtitle lg:web-subtitle bg-[#636b79]/20 px-4 py-2 rounded-full">
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
            <div className="flex flex-col items-center justify-center gap-3 xsm:items-end">
              <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#636B79]">
                Slippage Tolerance
              </p>
              <div className="flex justify-center xsm:justify-end">
                <button className="flex items-center gap-2 text-[#D3DAE6] mobile-subtitle w-auto sm:tablet-subtitle lg:web-subtitle bg-[#636b79]/20 px-4 py-3 rounded-xl">
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

          <div className="flex flex-wrap justify-between gap-2 xsm:flex-row">
            <div className="flex flex-col gap-2">
              <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#636B79]">
                Estimated Time:
              </p>
              <p className="text-white mobile-description sm:tablet-description lg:web-description">
                15 minutes
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#636B79]">
                Bridge Fee:
              </p>
              <p className="text-white mobile-description sm:tablet-description lg:web-description">
                2.50 USDT
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mobile-subtitle sm:tablet-subtitle lg:web-subtitle text-[#636B79]">
                Estimated Gas Cost:
              </p>
              <p className="text-white mobile-description sm:tablet-description lg:web-description">
                12.47 USDT
              </p>
            </div>
          </div>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default DefaultPathwayPage;
