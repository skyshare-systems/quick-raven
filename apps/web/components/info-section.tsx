import React from "react";
import SwapButton from "public/assets/info/s2-swap-img.svg";
import RatesButton from "public/assets/info/s2-rates-img.svg";
import QuickRavenText from "public/assets/quickraven-text.svg";
import UserIcon from "public/assets/info/s2-user-icon.svg";
import ProceedIcon from "public/assets/info/proceed-icon.svg";

import Grid from "public/assets/info/s2-grid.svg";
import GlowTop from "public/assets/info/s2-glow-top.svg";
import GlowLeft from "public/assets/info/s2-glow-left.svg";
import GlowRight from "public/assets/info/s2-glow-right.svg";
import { ParallaxLayer } from "@react-spring/parallax";

const InfoSectionPage = () => {
  return (
    <div
      className="relative flex flex-row py-[5rem] h-auto 2xl:max-h-[100dvh] justify-center items-center"
      id="info-section"
    >
      <Grid className="absolute top-0 left-1/2 transform -translate-x-1/2 object-fill w-full 2xl:opacity-0 max-h-[100vh]" />
      <Grid className="absolute bottom-0 left-1/2 transform -translate-x-1/2 object-fill w-full 2xl:opacity-0 max-h-[100vh]" />
      <Grid className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-h-[100vh]" />

      <GlowTop className="absolute top-[0] sm:-top-[10rem] left-1/2 transform -translate-x-1/2 w-full sm:w-[40rem]" />
      <GlowLeft className="absolute bottom-0 left-0 w-full sm:w-[40rem]" />
      <GlowRight className="absolute top-1/2 right-0 transform -translate-y-1/2 2xl:bottom-0 2xl:right-0 w-full sm:w-[40rem]" />
      <div className="flex flex-col justify-center items-center max-w-[1200px] grow gap-11 px-[1rem] lg:px-0">
        <div className="flex flex-wrap justify-center gap-5 md:gap-11 items-center h-full w-full">
          <div className="flex flex-col justify-end gap-11 p-8 pt-16 grow max-w-[576px] sm:max-h-[400px] border-[1px] border-[#1CACEF]/30 swap-bg rounded-2xl">
            <SwapButton className="w-full xsm:w-64" />

            <h1 className="font-[Excon] text-white/90 font-bold text-2xl text-white md:text-4xl">
              Achieve a seamless cross-chain swap with a single click
            </h1>
            <p className="font-[Switzer] text-white text-base text-white/80">
              Unlock effortless cross-chain swaps with QuickRaven in a single
              click, simplifying token transfers between diverse blockchain
              networks and streamlining the process for seamless transactions
              across platforms.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-11 p-8 pt-16 grow max-w-[576px] sm:max-h-[400px] border-[1px] border-[#1CACEF]/30 swap-bg rounded-2xl">
            <RatesButton className="w-full xsm:w-64" />

            <h1 className="font-[Excon] text-white/90 font-bold text-2xl text-white md:text-4xl">
              Offering optimal rates to maximize trading efficiency
            </h1>
            <p className="font-[Switzer] text-white text-base text-white/80">
              Unlock trade potential with our platform, providing optimal rates
              and arbitrage opportunities. Leverage multiple tokens and chains
              while factoring in gas costs for maximum trading efficiency.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 p-8 pt-16 grow w-full border-[1px] border-[#1CACEF]/30 swap-bg rounded-2xl">
          <div className="flex flex-col">
            <QuickRavenText className="w-full xsm:w-72" />
            <h3 className="mobile-h3 text-white">made with ❤️ for</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-5 md:gap-11 items-center h-full w-full">
            <div className="flex flex-col justify-between gap-11 p-8 grow max-w-[544px] border-[1px] border-[#1CACEF]/30 user-bg rounded-2xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <UserIcon className="w-10" />
                <div className="flex flex-col gap-2 items-start">
                  <h3 className="web-h3 text-white">Users</h3>
                  <p className="web-description text-white">
                    Choose the Chain, Token, and swap at the best rate with
                    utmost efficiency.
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <button className="web-title text-white flex flex-row gap-2 hover:scale-105 duration-150">
                  Join the waitlist <ProceedIcon />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-11 p-8 grow max-w-[544px] border-[1px] border-[#1CACEF]/30 user-bg rounded-2xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <UserIcon className="w-10" />
                <div className="flex flex-col gap-2 items-start">
                  <h3 className="web-h3 text-white">Projects</h3>
                  <p className="web-description text-white">
                    Seamlessly deploy cross-chain swap in your marketplace or
                    gamefi ecosystem without relying on QuickRaven UI.
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <button className="web-title text-white flex flex-row gap-2 hover:scale-105 duration-150">
                  Collaborate with us <ProceedIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSectionPage;
