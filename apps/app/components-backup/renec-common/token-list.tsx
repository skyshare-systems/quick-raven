// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { listOfToken } from "components/network";
// import {
//   useModal,
//   useSelectTokenDestination,
//   useDestinationInit,
// } from "lib/stores.ts/stores";
// import { useNetwork } from "wagmi";

// const TokenList = ({
//   isOpen,
//   labelNetwork,
//   chainID,
//   handleSelectToken,
//   onClose,
// }: any) => {
//   const hide = "hidden";
//   const show = "auto";
//   const [searchToken, setSearchToken] = useState("");
//   const { showModal, updateModal } = useModal((state) => state);
//   const { chain } = useNetwork();
//   const { tokenName: tokenDestinationName } = useSelectTokenDestination(
//     (state) => state
//   );

//   const { updateDestinationInit } = useDestinationInit((state) => state);

//   useEffect(() => {
//     isOpen
//       ? (document.body.style.overflowY = hide)
//       : (document.body.style.overflowY = show);
//   }, [isOpen]);

//   useEffect(() => {
//     listOfToken
//       .filter(
//         (filter) =>
//           filter.chainID === chain?.id &&
//           filter.tokenName === tokenDestinationName
//       )
//       .map((data) => {
//         updateDestinationInit(data.address);
//       });
//   }, [tokenDestinationName]);

//   if (!isOpen) return null;
//   return (
//     <div className="fixed top-0 flex justify-center items-center h-full w-full bg-black/30 backdrop-blur-sm z-[4]">
//       <div className="flex justify-center items-center grow p-[1px] max-w-[420px] rounded-2xl bg-[#363e4d]">
//         <div className="relative flex flex-col rounded-2xl h-full grow max-w-[420px] max-h-[520px] bg-[#0d1624] p-5 gap-5">
//           <div className="flex flex-row items-center justify-between">
//             <h1 className="grow mobile-description sm:tablet-description lg:web-description text-white">
//               Select a token
//             </h1>
//             <button
//               onClick={() => onClose(false)}
//               className="cursor-pointer duration-300 hover:scale-105 active:scale-95"
//             >
//               <Image
//                 src={"/icons/cross-icon.svg"}
//                 alt={"cross"}
//                 height={15}
//                 width={15}
//                 className="brightness-200"
//               />
//             </button>
//           </div>

//           <div className="flex flex-row justify-between gap-5 px-5  border-[1px] border-[#363e4d] rounded-xl ">
//             <Image
//               src={"/icons/search-icon.svg"}
//               alt={"cross"}
//               height={20}
//               width={20}
//               className="grow-0"
//             />
//             <input
//               type="text"
//               id="token-name"
//               name="token-name"
//               placeholder="Search Token:"
//               className="relative w-full h-full py-5 text-white grow"
//               onChange={(e) => setSearchToken(e.target.value)}
//             />
//           </div>
//           <div className="overflow-y-auto flex-col gap-5 h-full flex-grow-0">
//             {labelNetwork === "Initial Network" ? (
//               <>
//                 {listOfToken
//                   .filter((token) => token.chainID === chain?.id)
//                   .map((data, index) => {
//                     return (
//                       <div
//                         key={index}
//                         className="flex flex-row justify-between items-center duration-200 hover:bg-[#34344d] px-3 py-4 rounded-lg cursor-pointer"
//                         onClick={() => {
//                           handleSelectToken(
//                             data.tokenName,
//                             data.imgUrl,
//                             data.address,
//                             Number(chain?.id)
//                           );
//                         }}
//                       >
//                         <div className="flex flex-row items-center gap-2">
//                           <Image
//                             src={data.imgUrl}
//                             alt={data.tokenName}
//                             height={25}
//                             width={25}
//                           />
//                           <span className="flex flex-col justify-center gap-2">
//                             <p className="text-white mobile-title sm:tablet-title lg:web-title">
//                               {data.tokenName}
//                             </p>
//                             <p className="mobile-title sm:tablet-title lg:web-title text-[#7a7a7a]">
//                               0 {data.tokenName}
//                             </p>
//                           </span>
//                         </div>

//                         <div className="flex flex-row">
//                           <p className="text-white mobile-description sm:tablet-description lg:web-description">
//                             $ 0.00
//                           </p>
//                         </div>
//                       </div>
//                     );
//                   })}
//               </>
//             ) : (
//               <>
//                 {listOfToken
//                   .filter((token) => token.chainID === chainID)
//                   .map((data, index) => {
//                     return (
//                       <div
//                         key={index}
//                         className="flex flex-row justify-between items-center duration-200 hover:bg-[#34344d] px-3 py-4 rounded-lg cursor-pointer"
//                         onClick={() => {
//                           handleSelectToken(
//                             data.tokenName,
//                             data.imgUrl,
//                             data.address,
//                             chainID
//                           );
//                         }}
//                       >
//                         <div className="flex flex-row items-center gap-2">
//                           <Image
//                             src={data.imgUrl}
//                             alt={data.tokenName}
//                             height={25}
//                             width={25}
//                           />
//                           <span className="flex flex-col justify-center gap-2">
//                             <p className="text-white mobile-title sm:tablet-title lg:web-title">
//                               {data.tokenName}
//                             </p>
//                             <p className="mobile-title sm:tablet-title lg:web-title text-[#7a7a7a]">
//                               0 {data.tokenName}
//                             </p>
//                           </span>
//                         </div>

//                         <div className="flex flex-row">
//                           <p className="text-white mobile-description sm:tablet-description lg:web-description">
//                             $ 0.00
//                           </p>
//                         </div>
//                       </div>
//                     );
//                   })}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TokenList;
