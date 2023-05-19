import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { DexAggregatorABI, TokenABI, LPTokenABI } from "./abi";

export default defineConfig({
  out: "lib/blockchain.ts",
  contracts: [
    {
      name: "DexAggregatorBSC",
      abi: DexAggregatorABI as any,
      address: "0x46d0E2C12C0F785Bb0bd4AE391eb82008B9C23D3",
    },

    {
      name: "DexAggregatorMumbai",
      abi: DexAggregatorABI as any,
      address: "0x815Ac5d36d71E191aAe34f9b5979b68Ab0d2A1F4",
    },

    {
      name: "BscUsdtToken",
      abi: TokenABI as any,
      address: "0x44fDA5d55Cd5bFD262DcF0b90F2F105211131d18",
    },
    {
      name: "BscUsdcToken",
      abi: TokenABI as any,
      address: "0x45D463BFf2e01A125298BF9271B7BAFBdBeF001f",
    },
    {
      name: "BscWethToken",
      abi: TokenABI as any,
      address: "0x0518f7B2391916021111BB9Ce53F35a6f8C40Fe3",
    },
    {
      name: "BscMaticToken",
      abi: TokenABI as any,
      address: "0x9570B7D0e54f2AAed59F6615e2be18637A82d881",
    },
    {
      name: "BscLpUsdtUsdcLP",
      abi: LPTokenABI as any,
      address: "0xfF0B599Cb9514064dE1e29a85FC32E9b0e59a65f",
    },
    {
      name: "BscLpUsdtMaticLP",
      abi: LPTokenABI as any,
      address: "0x7a36666c7e02ED1F3517f7A921612d03B916C8DF",
    },
    {
      name: "BscLpUsdtWethLP",
      abi: LPTokenABI as any,
      address: "0x0d64d8c32844d3565C8109105e2346e92E305A98",
    },
    {
      name: "BscLpUsdcWethLP",
      abi: LPTokenABI as any,
      address: "0x1d4405431F1fB20993315950890646aEE7675E3f",
    },
    {
      name: "BscLpUsdcMaticLP",
      abi: LPTokenABI as any,
      address: "0xF041F264B08fBF105e697D812a12C7D0EB6E3F6F",
    },
    {
      name: "BscLpWethMaticLP",
      abi: TokenABI as any,
      address: "0xDD19e92F0877a8d4A61B55c6fBE6B204fa39eFC2",
    },

    {
      name: "MumbaiUsdtToken",
      abi: TokenABI as any,
      address: "0xa80f9A21dD4938Ef9Cc4a5CFd97d2e27973b491b",
    },
    {
      name: "MumbaiUsdcToken",
      abi: TokenABI as any,
      address: "0xc1D7eC1a5320ed08b6B019cACC80f29905A7EEfA",
    },
    {
      name: "MumbaiWethToken",
      abi: TokenABI as any,
      address: "0xe3aF098836c4641f8EcF9185E49F8C3E74d91348",
    },
    {
      name: "MumbaiMaticToken",
      abi: TokenABI as any,
      address: "0xDe7B766c83ddd2177087d8f6F8916A3B18722669",
    },
    {
      name: "MumbaiUsdtUsdcLP",
      abi: LPTokenABI as any,
      address: "0xf98809B88c5143cd6abcBb7431CE5F9A76e53126",
    },
    {
      name: "MumbaiUsdtWethLP",
      abi: LPTokenABI as any,
      address: "0xF3eC1ce03b6a2EC17e90FA0340DcB8E260922D00",
    },
    {
      name: "MumbaiUsdtMaticLP",
      abi: LPTokenABI as any,
      address: "0x8d1D0089736a2f3A9eCAe08a356dCB337F55234b",
    },
    {
      name: "MumbaiUsdcWethLP",
      abi: LPTokenABI as any,
      address: "0x0ceD130cdb3966b04B46d0E08776b71ce65230BF",
    },
    {
      name: "MumbaiUsdcMaticLP",
      abi: LPTokenABI as any,
      address: "0x12f0E87724054057c240f39cc3466bbD9b6Ef9AF",
    },
    {
      name: "MumbaiWethMaticLP",
      abi: LPTokenABI as any,
      address: "0x0b5249aA44039a6305597C329E2d790E0DfF6142",
    },
  ],
  plugins: [react()],
});
