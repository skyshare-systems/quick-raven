import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("Dex Aggregator", function () {
  async function deployContract() {
    const [deployer, otherAccount] = await ethers.getSigners();

    const Dex = await ethers.getContractFactory("DexAggregator");
    const dex = await upgrades.deployProxy(Dex, []);

    const Usdt = await ethers.getContractFactory("Token");
    const Usdc = await ethers.getContractFactory("Token");
    const Weth = await ethers.getContractFactory("Token");
    const Matic = await ethers.getContractFactory("Token");

    const usdt = await upgrades.deployProxy(Usdt, ["USDT", "USDT"]);
    const usdc = await upgrades.deployProxy(Usdc, ["USDC", "USDC"]);
    const weth = await upgrades.deployProxy(Weth, ["WETH", "WETH"]);
    const matic = await upgrades.deployProxy(Matic, ["MATIC", "MATIC"]);

    return { deployer, otherAccount, dex, usdt, usdc, weth, matic };
  }

  describe("Deploy", () => {
    it("Should be deployed properly", async () => {
      const { dex } = await loadFixture(deployContract);
      expect(dex.address);
    });
  });

  describe("Exchange", async () => {
    it("Should exchange the right amount using USDT", async () => {
      const { deployer, dex, usdt } = await loadFixture(deployContract);

      await usdt.mint(
        deployer.address,
        ethers.utils.parseEther(String(1_000_000))
      );
      await usdt.approve(dex.address, ethers.constants.MaxUint256);
    });
  });
});
