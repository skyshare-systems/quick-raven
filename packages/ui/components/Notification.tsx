import React, { useEffect, useState } from "react";
import { BoxContainer } from "ui/components";
import classNames from "ui/utils/helpers/classNames";

type NotificationVariant = "success" | "error" | "white";

const getVariantNotificationProps = (
  variant: NotificationVariant
): React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> => {
  switch (variant) {
    case "error":
      return {
        className:
          "hover:scale-105 duration-300 border-[1px] border-[#8e1828]/32",
      };

    case "white":
      return {
        className: "hover:scale-105 duration-300",
      };

    case "success":
    default:
      return {
        className:
          "hover:scale-105 duration-300 border-[1px] border-[#7ed321]/32 ",
      };
  }
};

interface NotificationProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: NotificationVariant;
}

const defaultClassName =
  "fixed md:top-0 md:right-0 md:py-6 md:px-8 z-50 text-left text-xl";

const Notification = ({
  children,
  variant = "success",
  className,
}: NotificationProps) => {
  const [show, setShow] = useState(true);

  // useEffect(() => {
  //   const timeId = setTimeout(() => {
  //     setShow(false);
  //   }, 3000);

  //   return () => {
  //     clearTimeout(timeId);
  //   };
  // }, []);

  if (!show) {
    return null;
  }

  const variantProps = getVariantNotificationProps(variant);

  const newClassName = classNames(defaultClassName, className ?? "");

  return (
    <div className={newClassName} onClick={() => setShow(false)}>
      <BoxContainer
        className={`p-4 ${variantProps.className} border-[1px] border-[#7ed321]/32 `}
      >
        {children}
      </BoxContainer>
    </div>
  );
};

export default Notification;
