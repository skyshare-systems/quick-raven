import React from "react";

const ContainerWrapper = ({ className = "", children }: any) => {
  return (
    <div className="relative flex flex-col justify-center  pb-[3rem] pt-[7rem] items-center min-h-[100vh] lg:h-[95vh] xl:min-h-[94vh] gap-5">
      <div
        className={`${className} flex flex-col lg:flex-row justify-center gap-5 w-full max-w-[500px] lg:max-w-[1020px]`}
      >
        {children}
      </div>
    </div>
  );
};

export default ContainerWrapper;
