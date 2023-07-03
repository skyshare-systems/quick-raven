import { ethers } from "hardhat";

const tknAddMum = [
  "0xa80f9A21dD4938Ef9Cc4a5CFd97d2e27973b491b",
  "0xc1D7eC1a5320ed08b6B019cACC80f29905A7EEfA",
  "0xe3aF098836c4641f8EcF9185E49F8C3E74d91348",
  "0xDe7B766c83ddd2177087d8f6F8916A3B18722669",
];

const tknAddFuji = [
  "0xcC6109eF2E83dD9ba2DC65b2279677206B27Eed5",
  "0xCcAB78Ae41d7E8C974d16FADCDd9308CE234549b",
  "0x94c1e05369F8D631dcC3b689897019Cd74F0C6E5",
  "0x6Af6D7E7F48D10aBAe3CBf60BDD5f252f1B026a4",
];

async function main() {
  for (let index = 0; index < tknAddFuji.length; index++) {
    const token = await ethers.getContractAt("Token", tknAddFuji[index]);

    await token.transfer(
      "0x29Ef7732832a7a19f7a40267F73f47af6cd69F9B",
      "100000000000000000000000"
    );
  }
}

main();
