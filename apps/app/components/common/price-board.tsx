import React from "react";
import Image from "next/image";

interface StatsPrice {
  token0Name: string;
  token0Value: any;
  token1Name: string;
  token1Value: number;
  gasfees: any;
}

const PriceBoardPage = ({
  token0Name,
  token0Value,
  token1Name,
  token1Value,
  gasfees,
}: StatsPrice) => {
  return (
    <>
      {token0Name && token1Name !== "" && (
        <div className="flex flex-row items-center justify-between grow border-[1px] border-[#474747] bg-[#141414] rounded-xl py-2 px-3  w-full">
          <div className="flex flex-wrap items-center gap-2 xsm:flex-row max-w-[250px]">
            {/*Fetch Selected Token 1 init network*/}
            <p className="mobile-description sm:tablet-description lg:web-description">
              {token0Value} {token0Name}
            </p>
            <Image
              src={"/icons/equals-icon.svg"}
              alt={"dropdown"}
              height={12}
              width={12}
            />
            {/*Fetch Selected Token-2 destination network*/}
            <p className="mobile-description sm:tablet-description lg:web-description">
              {token1Value} {token1Name}
            </p>
            {/* Equivalent */}
            <p className="mobile-description sm:tablet-description lg:web-description text-[#7a7a7a]">
              ($6.78)
            </p>
          </div>
          {/* Gas Fees  */}
          <div className="flex flex-wrap items-center justify-end gap-4 xsm:flex-row">
            <div className="flex gap-2">
              <Image
                src={"/icons/gas-fee-icon.svg"}
                alt={"dropdown"}
                height={15}
                width={15}
              />
              ${gasfees}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceBoardPage;
