import React, { useEffect, useState } from "react";
import Image from "next/image";
import Grid from "public/assets/supported-platforms/s3-grid.svg";
import TransactionPage from "./transaction-section";

const SupportedPlatformPage = () => {
  return (
    <div
      className="relative flex flex-col py-[10rem] h-auto lg:h-[150vh] justify-between items-center gap-5"
      id="supported-platform-section"
    >
      <Grid className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full" />

      <div className="flex flex-col gap-11 w-full justify-center items-center max-w-[1400px] px-5 lg:px-0">
        <h2 className="text-center mobile-h2 sm:tablet-h2 md:web-h2 text-white">
          Supported Platforms
        </h2>
        asd
      </div>

      <TransactionPage />
    </div>
  );
};

export default SupportedPlatformPage;
