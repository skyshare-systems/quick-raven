import React from "react";
import Image from "next/image";

interface Token {
  networkName: string;
  isOpen: any;
  tokenName: string;
  tokenImgUrl: string;
  chainID: number;
  labelNetwork: string;
}

const SelectTokenPage = ({
  networkName,
  isOpen,
  tokenName,
  tokenImgUrl,
  chainID,
}: Token) => {
  function handleClick() {
    isOpen(true);
  }
  return (
    <button
      onClick={() => handleClick()}
      disabled={networkName === ""}
      className={`flex flex-row items-center justify-center gap-2 bg-[#1b181c] border-[1px] rounded-md border-[#3b3b3b] w-full max-w-[150px] py-4
${
  networkName === ""
    ? "cursor-not-allowed"
    : "hover:brightness-150 duration-300"
}`}
    >
      {tokenName === "" ? (
        <p className=" mobile-overline sm:tablet-overline lg:web-overline ">
          Select Token
        </p>
      ) : (
        <div className="flex flex-row justify-between w-full px-4">
          <div className="flex justify-center items-center gap-2">
            <Image src={tokenImgUrl} alt={"refresh"} height={20} width={20} />
            <p className="mobile-overline sm:mobile-h3">{tokenName}</p>
          </div>

          <Image
            src={"/icons/dropdown-icon.svg"}
            alt={"refresh"}
            height={20}
            width={20}
          />
        </div>
      )}
    </button>
  );
};

export default SelectTokenPage;
