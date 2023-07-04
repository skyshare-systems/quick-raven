export const network = [
  {
    chainID: 80001,
    networkname: "Polygon Mumbai",
    shortname: "Polygon",
    imgUrl: "/icons/polygon-logo.svg",
    address: "0x815Ac5d36d71E191aAe34f9b5979b68Ab0d2A1F4",
    lpAddress: "0x8d1D0089736a2f3A9eCAe08a356dCB337F55234b",
    factoryAddress: "0x5757371414417b8c6caad45baef941abc7d3ab32",
    dexAggregatorAddress: "0x066deA3C411387a5A1ee74654cE16dC88e537EBb", // spender address
    dexRouterAddress: {
      uniswap: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
    },
    jsonRpcUrl: "https://rpc-mumbai.maticvigil.com",
    highColor: "rgba(116, 27, 229, 1) 0%, rgba(116, 27, 229, 0) 100%",
    upperColor: "rgba(116, 27, 229, 0.24) 0%, rgba(116, 27, 229, 0) 100%",
    lowerColor: "rgba(116, 27, 229, 0.12) 0%, rgba(116, 27, 229, 0) 100%",
    solidColor: "#08020F",
  },
  {
    chainID: 97,
    networkname: "Binance Smart Chain Testnet",
    shortname: "BSC",
    imgUrl: "/icons/bsc-icon.svg",
    address: "0x46d0E2C12C0F785Bb0bd4AE391eb82008B9C23D3",
    lpAddress: "0x7a36666c7e02ED1F3517f7A921612d03B916C8DF",
    factoryAddress: "0x46e9ad48575d08072e9a05a9bde4f22973628a8e",

    dexAggregatorAddress: "0x46d0E2C12C0F785Bb0bd4AE391eb82008B9C23D3", // spender address
    dexRouterAddress: {
      uniswap: "0xDE2Db97D54a3c3B008a097B2260633E6cA7DB1AF",
    },
    jsonRpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    highColor: "rgba(239, 200, 28, 1) 0%, rgba(239, 200, 28, 0) 100%",
    upperColor: "rgba(239, 200, 28, 0.24) 0%, rgba(239, 200, 28, 0) 100%",
    lowerColor: "rgba(239, 200, 28, 0.12) 0%, rgba(239, 200, 28, 0) 100%",
    solidColor: "#110E01",
  },
  {
    chainID: 10200,
    networkname: "Gnosis Chiado",
    shortname: "Gnosis",
    imgUrl: "/icons/gnosis-icon.svg",
    address: "0x44fDA5d55Cd5bFD262DcF0b90F2F105211131d18",
    lpAddress: "0x7a36666c7e02ED1F3517f7A921612d03B916C8DF",
    factoryAddress: "",
    dexAggregatorAddress: "0x44fDA5d55Cd5bFD262DcF0b90F2F105211131d18", // spender address
    dexRouterAddress: {
      uniswap: "0xDE2Db97D54a3c3B008a097B2260633E6cA7DB1AF",
    },
    jsonRpcUrl: "https://rpc.chiadochain.net",
    highColor: "rgba(22, 229, 142, 1) 0%, rgba(22, 229, 142, 0) 100%",
    upperColor: "rgba(22, 229, 142, 0.24) 0%, rgba(22, 229, 142, 0) 100%",
    lowerColor: "rgba(22, 229, 142, 0.12) 0%, rgba(22, 229, 142, 0) 100%",
    solidColor: "#061810",
  },

  {
    chainID: 43113,
    networkname: "Avalanche Fuji",
    shortname: "Avalanche",
    imgUrl: "/icons/avalanche.webp",
    address: "0x44fDA5d55Cd5bFD262DcF0b90F2F105211131d18",
    lpAddress: "",
    factoryAddress: "",
    dexAggregatorAddress: "0x600C74e3058cD8A9246b5E9c543261f73279f010", // spender address
    dexRouterAddress: {
      uniswap: "",
    },
    jsonRpcUrl: "https://rpc.chiadochain.net",
    highColor: "rgba(232, 65, 66, 1) 0%, rgba(232, 65, 66, 0) 100%",
    upperColor: "rgba(232, 65, 66, 0.24) 0%, rgba(232, 65, 66, 0) 100%",
    lowerColor: "rgba(232, 65, 66, 0.12) 0%, rgba(232, 65, 66, 0) 100%",
    solidColor: "#140303",
  },
];

export const listOfToken = [
  {
    chainID: 80001,
    tokenName: "USDT",
    address: "0xa80f9A21dD4938Ef9Cc4a5CFd97d2e27973b491b",
    imgUrl: "/icons/usdt-icon.svg",
  },
  {
    chainID: 80001,
    tokenName: "USDC",
    address: "0xc1D7eC1a5320ed08b6B019cACC80f29905A7EEfA",
    imgUrl: "/icons/usdc-icon.svg",
  },
  {
    chainID: 80001,
    tokenName: "WETH",
    address: "0xe3aF098836c4641f8EcF9185E49F8C3E74d91348",
    imgUrl: "/icons/eth-icon.svg",
  },
  {
    chainID: 80001,
    tokenName: "Matic",
    address: "0xDe7B766c83ddd2177087d8f6F8916A3B18722669",
    imgUrl: "/icons/matic-icon.svg",
  },
  {
    chainID: 97,
    tokenName: "USDT",
    address: "0x44fDA5d55Cd5bFD262DcF0b90F2F105211131d18",
    imgUrl: "/icons/usdt-icon.svg",
  },
  {
    chainID: 97,
    tokenName: "USDC",
    address: "0x45D463BFf2e01A125298BF9271B7BAFBdBeF001f",
    imgUrl: "/icons/usdc-icon.svg",
  },
  {
    chainID: 97,
    tokenName: "WETH",
    address: "0x0518f7B2391916021111BB9Ce53F35a6f8C40Fe3",
    imgUrl: "/icons/eth-icon.svg",
  },
  {
    chainID: 97,
    tokenName: "Matic",
    address: "0x9570B7D0e54f2AAed59F6615e2be18637A82d881",
    imgUrl: "/icons/matic-icon.svg",
  },
  {
    chainID: 10200,
    tokenName: "USDT",
    address: "0xc1D7eC1a5320ed08b6B019cACC80f29905A7EEfA",
    imgUrl: "/icons/usdt-icon.svg",
  },
  {
    chainID: 10200,
    tokenName: "USDC",
    address: "0xe3aF098836c4641f8EcF9185E49F8C3E74d91348",
    imgUrl: "/icons/usdc-icon.svg",
  },
  {
    chainID: 10200,
    tokenName: "WETH",
    address: "0xDe7B766c83ddd2177087d8f6F8916A3B18722669",
    imgUrl: "/icons/eth-icon.svg",
  },
  {
    chainID: 10200,
    tokenName: "Matic",
    address: "0x71e711Cd6b13125f53A5c238B015841a3c8315D7",
    imgUrl: "/icons/matic-icon.svg",
  },

  {
    chainID: 43113,
    tokenName: "USDT",
    address: "0xcC6109eF2E83dD9ba2DC65b2279677206B27Eed5",
    imgUrl: "/icons/usdt-icon.svg",
  },
  {
    chainID: 43113,
    tokenName: "USDC",
    address: "0xCcAB78Ae41d7E8C974d16FADCDd9308CE234549b",
    imgUrl: "/icons/usdc-icon.svg",
  },
  {
    chainID: 43113,
    tokenName: "WETH",
    address: "0x94c1e05369F8D631dcC3b689897019Cd74F0C6E5",
    imgUrl: "/icons/eth-icon.svg",
  },
  {
    chainID: 43113,
    tokenName: "Matic",
    address: "0x6Af6D7E7F48D10aBAe3CBf60BDD5f252f1B026a4",
    imgUrl: "/icons/matic-icon.svg",
  },
];
