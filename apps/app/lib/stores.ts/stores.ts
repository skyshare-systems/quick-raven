import { create } from "zustand";

interface Network {
  networkName: string;
  imgUrl: string;
  jsonRpcUrl: string;
  updateNetwork: (
    networkName: string,
    imgUrl: string,
    jsonRpcUrl: string
  ) => void;
}

interface Modal {
  showModal: boolean;
  updateModal: (showModal: boolean) => void;
}

interface getBalanceOf {
  balanceOfToken0: number;
  balanceOfToken1: number;
  updateBalanceOf: (balanceOfToken0: number, balanceOfToken1: number) => void;
}

interface SelectToken {
  tokenName: string;
  tokenImgUrl: string;
  tokenAddress: `0x${string}`;
  tokenChainID: number;

  updateSelectedToken: (
    tokenName: string,
    tokenImgUrl: string,
    tokenAddress: `0x${string}`,
    tokenChainID: number
  ) => void;
}

interface SelectLabelNetwork {
  labelNetwork: string;
  chainID: number;
  updateLabelNetwork: (labelNetwork: string, chainID: number) => void;
}
export const useLabelNetwork = create<SelectLabelNetwork>((set) => ({
  labelNetwork: "",
  chainID: 0,
  updateLabelNetwork: (labelNetwork, chainID) => {
    set((state) => ({ ...state, labelNetwork, chainID }));
  },
}));

export const useNetworkInit = create<Network>((set) => ({
  networkName: "",
  imgUrl: "",
  jsonRpcUrl: "",
  updateNetwork: (networkName, imgUrl, jsonRpcUrl) => {
    set((state) => ({ ...state, networkName, imgUrl, jsonRpcUrl }));
  },
}));

export const useNetworkDestination = create<Network>((set) => ({
  networkName: "",
  imgUrl: "",
  jsonRpcUrl: "",
  updateNetwork: (networkName, imgUrl, jsonRpcUrl) => {
    set((state) => ({ ...state, networkName, imgUrl, jsonRpcUrl }));
  },
}));

export const useBalanceOf = create<getBalanceOf>((set) => ({
  balanceOfToken0: 0,
  balanceOfToken1: 0,
  updateBalanceOf: (balanceOfToken0, balanceOfToken1) => {
    set((state) => ({ ...state, balanceOfToken0, balanceOfToken1 }));
  },
}));

export const useSelectTokenInit = create<SelectToken>((set) => ({
  tokenName: "",
  tokenImgUrl: "",
  tokenAddress: "0x",
  tokenChainID: 0,

  updateSelectedToken: (tokenName, tokenImgUrl, tokenAddress, tokenChainID) => {
    set((state) => ({
      ...state,
      tokenName,
      tokenImgUrl,
      tokenAddress,
      tokenChainID,
    }));
  },
}));

export const useSelectTokenDestination = create<SelectToken>((set) => ({
  tokenName: "",
  tokenImgUrl: "",
  tokenAddress: "0x",
  tokenChainID: 0,

  updateSelectedToken: (tokenName, tokenImgUrl, tokenAddress, tokenChainID) => {
    set((state) => ({
      ...state,
      tokenName,
      tokenImgUrl,
      tokenAddress,
      tokenChainID,
    }));
  },
}));

export const useModal = create<Modal>((set) => ({
  showModal: false,
  updateModal: (showModal) => {
    set((state) => ({ ...state, showModal }));
  },
}));

interface DestinationAddress {
  address: string;
  updateDestinationInit: (address: string) => void;
}

export const useDestinationInit = create<DestinationAddress>((set) => ({
  address: "0x",
  updateDestinationInit: (address) => {
    set((state) => ({ ...state, address }));
  },
}));

interface SwitchColorBg {
  bgColor: string;
  bodyBgId: string;
  updateBgColor: (bgColor: string, bodyBgId: string) => void;
}

export const useSwitchColorBg = create<SwitchColorBg>((set) => ({
  bgColor: "bg-radial-evm",
  bodyBgId: "multi-chain-swap",
  updateBgColor: (bgColor, bodyBgId) => {
    set((state) => ({ ...state, bgColor, bodyBgId }));
  },
}));
