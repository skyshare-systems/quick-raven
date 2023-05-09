import Link from "next/link";
import classNames from "ui/utils/helpers/classNames";

type ButtonVariant =
  | "cyan"
  | "secondary"
  | "custom-black"
  | "transparent"
  | "disable-gray"
  | "black-cyan-border"
  | "purple-cyan"
  | "custom-black-input";

const getVariantSpecificButtonProps = (
  variant: ButtonVariant
): React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> => {
  switch (variant) {
    case "cyan":
      return {
        className:
          "bg-[#36f1e6] px-8 py-4  text-black border-0 drop-shadow-5xl",
      };
    case "secondary":
      return {
        className:
          "bg-[#141414] px-8 py-4  font-[Switzer-Regular]  text-[#E8EFED] ",
      };
    case "custom-black":
      return {
        className:
          "bg-[#212121] font-[Switzer-Regular] border-transparent border-[1px] text-[#ffffff] rounded-xl",
      };
    case "custom-black-input":
      return {
        className:
          "bg-[#212121] font-[Switzer-Regular] border-[#616161] border-[1px] text-[#ffffff] rounded-xl",
      };
    case "transparent":
      return {
        className:
          "font-[Switzer-Regular] px-8 py-4  border-0 hover:text-[#36f1e6] hover:bg-[#36f1e6]/20 rounded-lg transition ease-out duration-200",
      };
    case "disable-gray":
      return {
        className:
          "font-[Switzer-Regular] border-0 text-white bg-[#2b2b2b] rounded-[1.2rem] py-5 cursor-no-drop",
      };
    case "purple-cyan":
      return {
        className:
          "font-[Switzer-Regular] border-0 text-white bg-[#2b2b2b] rounded-[1.2rem] py-5 cursor-no-drop bg-gradient-to-l bg-gradient-to-l from-[#43bbd9] via-[#5479c9 ] to-purple-600",
      };
    case "black-cyan-border":
      return {
        className:
          "bg-[#212121] font-[Switzer-Regular] border-[1px] text-[#ffffff] rounded-xl",
      };
    default:
      return {
        className:
          "bg-[#212121] font-[Switzer-Regular] border-[1px] text-[#ffffff] rounded-xl",
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

const defaultClassName = "rounded-lg font-[Switzer-Bold]";

const Button = ({
  children,
  variant = "cyan",
  disabled = false,
  ...props
}: ButtonProps) => {
  const variantProps = getVariantSpecificButtonProps(variant);

  const className = classNames(
    defaultClassName,
    variantProps.className ?? "",
    props.className ?? ""
  );

  return (
    <button {...props} className={className} disabled={disabled}>
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
