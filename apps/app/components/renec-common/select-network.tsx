import React from "react";
import Image from "next/image";
import { useSelectNetwork } from "lib/stores.ts/stores";

interface SelectNetwork {
  networkName0: string;
  networkName1: string;
  chainID: number;
  imgUrl: string;
  labelNetwork: string;
  isOpen: any;
}

const SelectNetworkPage = ({
  networkName0,
  networkName1,
  chainID,
  imgUrl,
  labelNetwork,
  isOpen,
}: SelectNetwork) => {
  const { updateSelectNetwork } = useSelectNetwork((state) => state);

  function handleClick() {
    isOpen(true);
    updateSelectNetwork(labelNetwork, chainID, true);
  }
  return (
    <button
      disabled={networkName0 === ""}
      onClick={() => handleClick()}
      className={`flex flex-row items-center gap-3 w-full max-w-[150px] bg-[#636b79]/20 rounded-full px-4 py-3 
                          ${
                            networkName0 === ""
                              ? "cursor-not-allowed justify-center"
                              : "hover:brightness-150 duration-300"
                          }`}
    >
      {networkName1 === "" ? (
        <p className="mobile-title py-1 sm:tablet-title lg:web-title text-[#D3DAE6]">
          Select Network
        </p>
      ) : (
        <>
          <Image src={imgUrl} alt={"refresh"} height={25} width={25} />
          <p className="mobile-title sm:tablet-title lg:web-title">
            {networkName1}
          </p>
        </>
      )}
    </button>
  );
};

export default SelectNetworkPage;
