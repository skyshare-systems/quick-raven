import React from "react";
import Image from "next/image";

interface ITitle {
  isOpen: any;
  headerName: string;
}

const TitlePage = ({ isOpen, headerName }: ITitle) => {
  return (
    <div className="flex flex-row justify-between w-full py-1">
      <h1 className="mobile-title sm:tablet-title lg:web-title grow">
        {headerName}
      </h1>
      <div className="flex flex-row gap-3 cursor-pointer">
        <Image
          src={"/icons/refresh-icon.svg"}
          alt={"refresh"}
          height={15}
          width={15}
        />

        <Image
          src={"/icons/settings-icon.svg"}
          alt={"settings"}
          height={15}
          width={15}
          onClick={() => isOpen(!isOpen)}
        />
      </div>
    </div>
  );
};

export default TitlePage;
