import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/s-hdjLqITCIC-0yx948QMzzi7v-43Sss",
      accounts: [
        "5acc566e889da617b7f8032ed5f745af8ad695ec2f5421b42b09be517067c051" ??
          "",
      ],
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/7367c86527024f0daa1d03b7b64faa7d",
      accounts: [
        "5acc566e889da617b7f8032ed5f745af8ad695ec2f5421b42b09be517067c051" ??
          "",
      ],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [
        "5acc566e889da617b7f8032ed5f745af8ad695ec2f5421b42b09be517067c051" ??
          "",
      ],
    },
  },
  etherscan: {
    apiKey: {
      polygon: "7RQGFQS84Q5FNNF84YQ61T3MQDJ5Y1EB1B" ?? "",
      polygonMumbai: "7RQGFQS84Q5FNNF84YQ61T3MQDJ5Y1EB1B" ?? "",
      goerli: "1T7UC6DGWNA36AVHC4IGIRRE1MTGCSKE74" ?? "",
      sepolia: "1T7UC6DGWNA36AVHC4IGIRRE1MTGCSKE74" ?? "",
      bscTestnet: "GWKE3MR5JXP1KVY4635YHC8AKI7FI55WK3" ?? "",
      mainnet: "1T7UC6DGWNA36AVHC4IGIRRE1MTGCSKE74" ?? "",
    },
  },
};

export default config;
