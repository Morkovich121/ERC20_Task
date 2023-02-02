const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Project", function () {

  let owner
  let firstBuyer
  let secondBuyer

  beforeEach(async function () {
    [owner, firstBuyer, secondBuyer] = await ethers.getSigners();

    const Project = await ethers.getContractFactory("Project", owner);
    proj = await Project.deploy();
    await proj.deployed();
  });
  describe('transferTask', function () {
    it('should fail if the length of accounts and amounts arrays are not equal', async function () {
      const accounts = [firstBuyer.address, secondBuyer.address];
      const amounts = [1, 2, 3];
      await expect(proj.callTransferTask(owner.address, accounts, amounts)).to.be.revertedWith('Not equal length of arrays');
    });

    it('should fail if the length of accounts and amounts arrays are both 0', async function () {
      const accounts = [];
      const amounts = [];
      await expect(proj.callTransferTask(owner.address, accounts, amounts)).to.be.revertedWith('Length of arrays must be more than 0');
    });

    it('should transfer amounts to specified accounts', async function () {
      const accounts = [firstBuyer.address, secondBuyer.address];
      const startBalances = [];
      const endBalances = [];
      for (let i = 0; i < accounts.length; i++) {
        startBalances.push(await proj.balanceOf(accounts[i]))
      }
      const amounts = [2, 3];
      await proj.callTransferTask(owner.address, accounts, amounts);
      for (let i = 0; i < accounts.length; i++) {
        endBalances.push(await proj.balanceOf(accounts[i]))
      }
      let areAllOperationsSuccessful = true;
      for (let i = 0; i < accounts.length; i++) {
        if (endBalances[i] === startBalances[i]) areAllOperationsSuccessful = false;
      }
      expect(areAllOperationsSuccessful).to.be.true;
    });

    it('should fail if the transfer amount exceeds balance', async function () {
      const accounts = [firstBuyer.address, secondBuyer.address];
      const amounts = [999, 999];
      await expect(proj.callTransferTask(owner.address, accounts, amounts)).to.be.revertedWith('ERC20: transfer amount exceeds balance');
    });

  });
});
