import { expect } from "chai";
import { ethers } from "hardhat";
import { EscrowContract } from "../typechain-types";

describe("EscrowContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let EscrowContract: EscrowContract;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const EscrowContractFactory = await ethers.getContractFactory("EscrowContract");
    EscrowContract = (await EscrowContractFactory.deploy(owner.address)) as EscrowContract;
    await EscrowContract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await EscrowContract.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await EscrowContract.setGreeting(newGreeting);
      expect(await EscrowContract.greeting()).to.equal(newGreeting);
    });
  });
});
