import { create } from "zustand";

interface Network {
  networkName: string;
  imgUrl: string;
  updateNetwork: (networkName: string, imgUrl: string) => void;
}

interface SelectNetwork {
  labelNetwork: string;
  showModal: boolean;
  updateSelectNetwork: (labelNetwork: string, showModal: boolean) => void;
}

interface getBalanceOf {
  balanceOfToken0: number;
  balanceOfToken1: number;
  updateBalanceOf: (balanceOfToken0: number, balanceOfToken1: number) => void;
}

// interface SelectToken {
//   token0Name
// }

export const useSelectNetwork = create<SelectNetwork>((set) => ({
  labelNetwork: "",
  showModal: false,
  updateSelectNetwork: (labelNetwork, showModal) => {
    set((state) => ({ ...state, labelNetwork, showModal }));
  },
}));

export const useNetworkInit = create<Network>((set) => ({
  networkName: "",
  imgUrl: "",
  updateNetwork: (networkName, imgUrl) => {
    set((state) => ({ ...state, networkName, imgUrl }));
  },
}));

export const useNetworkDestination = create<Network>((set) => ({
  networkName: "",
  imgUrl: "",
  updateNetwork: (networkName, imgUrl) => {
    set((state) => ({ ...state, networkName, imgUrl }));
  },
}));

export const useBalanceOf = create<getBalanceOf>((set) => ({
  balanceOfToken0: 0,
  balanceOfToken1: 0,
  updateBalanceOf: (balanceOfToken0, balanceOfToken1) => {
    set((state) => ({ ...state, balanceOfToken0, balanceOfToken1 }));
  },
}));
