import Link from "next/link";
import classNames from "ui/utils/helpers/classNames";

type ButtonVariant =
  | "forest"
  | "green"
  | "pink"
  | "mint"
  | "brown"
  | "orange"
  | "white"
  | "custom-green"
  | "custom-gray"
  | "disabled"
  | "custom-green-fusion";

const getVariantSpecificButtonProps = (
  variant: ButtonVariant
): React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> => {
  switch (variant) {
    case "forest":
      return {
        className:
          "bg-[#223843] py-3 border-0 text-[#E8EFED] duration-300 hover:scale-[1.05] active:scale-[0.9] cursor-pointer  rounded-md",
      };
    case "custom-green":
      return {
        className:
          "bg-[#3ab65f] py-3 px-6 border-0 text-black font-[IntegralCF-Bold] duration-300 hover:text-white hover:scale-[1.05] active:scale-[0.95] cursor-pointer  rounded-md",
      };
    case "custom-green-fusion":
      return {
        className:
          "bg-[#3ab65f] py-3 px-6 border-0 text-black font-[IntegralCF-Bold] duration-300 hover:text-white cursor-pointer hover:pr-[5rem] rounded-md",
      };
    case "custom-gray":
      return {
        className:
          "bg-[#231f20] py-2 border-0 gap-3 px-3 text-[#3ab65f]  duration-300 hover:brightness-200 cursor-pointer font-semibold text-lg rounded-3xl",
      };
    case "pink":
      return {
        className: "bg-[#C089AC] py-3 border-0 text-[#E8EFED]  rounded-md",
      };
    case "mint":
      return {
        className: "bg-[#E8EFED] py-3 border-0 text-[#223843]  rounded-md",
      };
    case "brown":
      return {
        className: "bg-[#D8B4A0] py-3 border-0 text-[#E8EFED]  rounded-md",
      };
    case "orange":
      return {
        className:
          "bg-[#D77610] py-3 border-0 text-[#E8EFED] duration-300 hover:scale-[1.1] active:scale-[0.9] cursor-pointer  rounded-md",
      };
    case "white":
      return {
        className: "bg-[#FFFFFF] py-3 border-0 text-[#223843]  rounded-md",
      };
    case "disabled":
      return {
        className:
          "bg-[grey] py-3 border-0 text-[#223843] font-[IntegralCF-Bold] cursor-not-allowed disabled  rounded-md",
      };
    case "green":
    default:
      return {
        className: "bg-[#5D7A89] py-3 border-0 text-[#E8EFED]  rounded-md",
      };
  }
};

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: ButtonVariant;
}

const defaultClassName =
  "flex justify-center border border-transparent text-lg";

const Button = ({ children, variant = "green", ...props }: ButtonProps) => {
  const variantProps = getVariantSpecificButtonProps(variant);

  const className = classNames(
    defaultClassName,
    variantProps.className ?? "",
    props.className ?? ""
  );

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

interface LinkButtonProps extends ButtonProps {
  href: string;
  linkProps?: Record<string, any>;
  target?: string;
}

export const LinkButton = ({
  href,
  linkProps,
  target = "_self",
  ...props
}: LinkButtonProps) => {
  return (
    <Link {...linkProps} href={href} target={target}>
      <Button {...props} />
    </Link>
  );
};

export default Button;
