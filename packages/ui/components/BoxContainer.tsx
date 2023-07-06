import React from "react";
import classNames from "../utils/helpers/classNames";
interface BoxContainerProps {
  children: React.ReactNode;
  className?: string;
}

const defaultClassName =
  "relative z-50 flex flex-row gap-5 items-center bg-[#1b1b1b]/[0.7] backdrop-blur-sm border-[1px] border-[#7ed321]/32 shadow-container rounded-md text-white";

const BoxContainer = ({ children, className }: BoxContainerProps) => {
  const newClassName = classNames(defaultClassName, className ?? "");

  return <div className={newClassName}>{children}</div>;
};

export default BoxContainer;
