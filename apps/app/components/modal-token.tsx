"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { tokenpolygon, tokenbsc } from "./network";

const ModalTokenPage = ({
  onClose,
  isOpen,
  initNetwork,
  chainId,
  handleSelectedTokenInit,
}: any) => {
  const hide = "hidden";
  const show = "auto";
  const [searchToken, setSearchToken] = useState("");

  useEffect(() => {
    isOpen
      ? (document.body.style.overflowY = hide)
      : (document.body.style.overflowY = show);
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed top-0 h-full w-full flex flex-col justify-center items-center bg-black/30 backdrop-blur-sm z-[3]">
      <div className="relative flex flex-col rounded-2xl h-full w-full max-w-[500px] max-h-[500px] bg-[#212121] pr-2 py-2">
        <div className="relative flex flex-col p-5 z-[2] w-full gap-5 overflow-y-auto">
          <div className="relative flex flex-col p-5 z-[2] w-full gap-5 ">
            <div className="flex flex-row items-center justify-between ">
              <h1 className="grow mobile-description sm:tablet-description lg:web-description text-[#7a7a7a]">
                Select a token
              </h1>
              <button
                onClick={() => onClose(false)}
                className="cursor-pointer duration-300 hover:scale-105 active:scale-95"
              >
                <Image
                  src={"/icons/cross-icon.svg"}
                  alt={"cross"}
                  height={20}
                  width={20}
                />
              </button>
            </div>
            {/* Search Token  */}
            <div className="flex flex-row justify-between gap-5 px-5  border-[1px] border-[#424242] rounded-xl ">
              <Image
                src={"/icons/search-icon.svg"}
                alt={"cross"}
                height={20}
                width={20}
                className="grow-0"
              />
              <input
                type="text"
                id="token-name"
                name="token-name"
                placeholder="Search Token Name:"
                className="relative w-full h-full py-5 text-white grow"
                onChange={(e) => setSearchToken(e.target.value)}
              />
            </div>
            {/* white list token  */}
            {chainId === 80001 && (
              <>
                <div className="flex flex-wrap gap-3">
                  {tokenpolygon.map((data, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() =>
                          handleSelectedTokenInit(
                            data.tokenName,
                            data.imgUrl,
                            data.address
                          )
                        }
                        disabled={initNetwork === ""}
                        className={`flex flex-row items-center gap-2 justify-center bg-[#212121] border-2 rounded-xl border-[#3b3b3b] px-3 py-3 min-h-[50px]
                        ${
                          initNetwork === ""
                            ? "cursor-not-allowed"
                            : "hover:brightness-125 duration-300 hover:scale-105 active:scale-95"
                        }`}
                      >
                        <Image
                          src={data.imgUrl}
                          alt={data.tokenName}
                          height={20}
                          width={20}
                          className="max-w-[20] max-h-[20]"
                        />
                        <p className="text-white mobile-title sm:tablet-title lg:web-title">
                          {data.tokenName}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <hr className="border-[#3b3b3b]" />

                <div className="flex flex-col justify-center w-full gap-5">
                  {tokenpolygon
                    .filter((dataFilter) => {
                      return searchToken.toLowerCase() === "" ||
                        searchToken.toUpperCase() === ""
                        ? dataFilter
                        : dataFilter.tokenName
                            .toLowerCase()
                            .includes(searchToken) ||
                            dataFilter.tokenName
                              .toUpperCase()
                              .includes(searchToken);
                    })
                    .map((data, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-row justify-between items-center duration-200 hover:bg-[#2e2e2e] px-3 py-4 rounded-lg"
                          onClick={() =>
                            handleSelectedTokenInit(
                              data.tokenName,
                              data.imgUrl,
                              data.address
                            )
                          }
                        >
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src={data.imgUrl}
                              alt={data.tokenName}
                              height={25}
                              width={25}
                            />
                            <span className="flex flex-col justify-center gap-2">
                              <p className="text-white mobile-title sm:tablet-title lg:web-title">
                                {data.tokenName}
                              </p>
                              <p className="mobile-title sm:tablet-title lg:web-title text-[#7a7a7a]">
                                0 {data.tokenName}
                              </p>
                            </span>
                          </div>

                          <div className="flex flex-row">
                            <p className="text-white mobile-description sm:tablet-description lg:web-description">
                              $ 0.00
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            )}

            {chainId === 97 && (
              <>
                <div className="flex flex-wrap gap-3">
                  {tokenbsc.map((data, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() =>
                          handleSelectedTokenInit(
                            data.tokenName,
                            data.imgUrl,
                            data.address
                          )
                        }
                        disabled={initNetwork === ""}
                        className={`flex flex-row items-center gap-2 justify-center bg-[#212121] border-2 rounded-xl border-[#3b3b3b] px-3 py-3 min-h-[50px]
                        ${
                          initNetwork === ""
                            ? "cursor-not-allowed"
                            : "hover:brightness-125 duration-300 hover:scale-105 active:scale-95"
                        }`}
                      >
                        <Image
                          src={data.imgUrl}
                          alt={data.tokenName}
                          height={20}
                          width={20}
                          className="max-w-[20] max-h-[20]"
                        />
                        <p className="text-white mobile-title sm:tablet-title lg:web-title">
                          {data.tokenName}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <hr className="border-[#3b3b3b]" />

                <div className="flex flex-col justify-center w-full gap-5">
                  {tokenbsc
                    .filter((dataFilter) => {
                      return searchToken.toLowerCase() === "" ||
                        searchToken.toUpperCase() === ""
                        ? dataFilter
                        : dataFilter.tokenName
                            .toLowerCase()
                            .includes(searchToken) ||
                            dataFilter.tokenName
                              .toUpperCase()
                              .includes(searchToken);
                    })
                    .map((data, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-row justify-between items-center duration-200 hover:bg-[#2e2e2e] px-3 py-4 rounded-lg"
                          onClick={() =>
                            handleSelectedTokenInit(
                              data.tokenName,
                              data.imgUrl,
                              data.address
                            )
                          }
                        >
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src={data.imgUrl}
                              alt={data.tokenName}
                              height={25}
                              width={25}
                            />
                            <span className="flex flex-col justify-center gap-2">
                              <p className="text-white mobile-title sm:tablet-title lg:web-title">
                                {data.tokenName}
                              </p>
                              <p className="mobile-title sm:tablet-title lg:web-title text-[#7a7a7a]">
                                0 {data.tokenName}
                              </p>
                            </span>
                          </div>

                          <div className="flex flex-row">
                            <p className="text-white mobile-description sm:tablet-description lg:web-description">
                              $ 0.00
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="absolute top-0 left-0 border-[2px] border-[#3b3b3b] h-full w-full z-[1] rounded-2xl faded-bottom" />
      </div>
    </div>
  );
};

export default ModalTokenPage;
