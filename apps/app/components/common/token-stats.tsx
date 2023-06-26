import React from "react";

interface Stats {
  convertedValue: number;
  balance: number;
  tokenName: string;
}

const TokenStatsPage = ({ convertedValue, balance, tokenName }: Stats) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <p className="mobile-overline sm:tablet-overline md:web-overline text-[#C6C6C6]">
        ~${convertedValue}
      </p>

      <p className="mobile-overline sm:tablet-overline md:web-overline">
        <span className="text-[#767676]">Balance:</span>{" "}
        <span className="text-[#C6C6C6]">
          {balance} {tokenName}
        </span>
      </p>
    </div>
  );
};

export default TokenStatsPage;
