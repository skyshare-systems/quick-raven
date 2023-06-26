import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Image from "next/image";

// eslint-disable-next-line react/prop-types
const ImportTokenPage = ({ name, address, symbols, decimal }) => {
  const addToken = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (!provider) {
        alert("Please install metamask to proceed");
      } else {
        await provider.request({
          method: "eth_requestAccounts",
        });
        await provider.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address,
              symbol: symbols,
              decimals: decimal,
            },
          },
        });
      }
    } catch {
      console.info("Unable to add the token");
    }
  };

  return (
    <button
      onClick={() => addToken()}
      className="bg-[#252525] text-[#c6c6c6] w-full flex flex-row gap-2 items-center justify-center px-3 py-3 uppercase rounded-md mobile-tile sm:tablet-title lg:web-title hover:scale-105 active:scale-95 duration-300"
    >
      <Image
        src={"/icons/modal/import-icon.svg"}
        alt={"copy-icon"}
        height={15}
        width={15}
      />
      Import
    </button>
  );
};

export default ImportTokenPage;
