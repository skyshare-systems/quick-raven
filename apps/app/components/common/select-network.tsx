import React from "react";
import Image from "next/image";
import { useSelectNetwork } from "lib/stores.ts/stores";

interface SelectNetwork {
  networkName0: string;
  networkName1: string;
  imgUrl: string;
  labelNetwork: string;
}

const SelectNetworkPage = ({
  networkName0,
  networkName1,
  imgUrl,
  labelNetwork,
}: SelectNetwork) => {
  const { updateSelectNetwork } = useSelectNetwork((state) => state);

  return (
    <button
      disabled={networkName0 === ""}
      onClick={() => updateSelectNetwork(labelNetwork, true)}
      className={`flex flex-row items-center gap-3 w-full max-w-[150px] bg-[#1b181c] border-[1px] rounded-full border-[#3b3b3b] px-4 py-2 
                          ${
                            networkName0 === ""
                              ? "cursor-not-allowed justify-center"
                              : "hover:brightness-150 duration-300"
                          }`}
    >
      {networkName1 === "" ? (
        <p className="mobile-title py-1 sm:tablet-title lg:web-title text-[#7a7a7a]">
          Select Network
        </p>
      ) : (
        <>
          <Image src={imgUrl} alt={"refresh"} height={20} width={20} />
          <p className="mobile-title sm:tablet-title lg:web-title">
            {networkName1}
          </p>
        </>
      )}
    </button>
  );
};

export default SelectNetworkPage;
