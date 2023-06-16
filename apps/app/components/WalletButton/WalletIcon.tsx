import type { Wallet } from "@solana/wallet-adapter-react";
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";

export interface WalletIconProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  wallet: Wallet | null;
}

export const WalletIcon: FC<WalletIconProps> = ({ wallet, ...props }) => {
  return (
    wallet && (
      <img
        src={wallet.adapter.icon}
        alt={`${wallet.adapter.name} icon`}
        {...props}
        className="!w-[20px] !h-[20px] rounded-full"
      />
    )
  );
};
