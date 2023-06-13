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
