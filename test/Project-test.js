const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Project", function () {

  let owner
  let buyer1
  let buyer2
  let auct

  beforeEach(async function () {
    [owner, buyer1, buyer2] = await ethers.getSigners();

    const Project = await ethers.getContractFactory("Project", owner);
    proj = await Project.deploy();
    await proj.deployed();
  });
  describe('transferTask', function () {
    it('should check if owner is correct', async function () {
      expect(await proj.owner()).to.equal(owner.address);
    });

    it('should fail if the length of accounts and amounts arrays are not equal', async function () {
      const accounts = [buyer1.address, buyer2.address];
      const amounts = [1, 2, 3];
      await expect(proj.transferTask(accounts, amounts)).to.be.revertedWith('Not equal length of arrays');
    });

    it('should fail if the length of accounts and amounts arrays are both 0', async function () {
      const accounts = [];
      const amounts = [];
      await expect(proj.transferTask(accounts, amounts)).to.be.revertedWith('Length of arrays must be more than 0');
    });

    it('should transfer amounts to specified accounts', async function () {
      const accounts = [buyer1.address, buyer2.address];
      const amounts = [1, 3];
      const result = (await proj.transferTask(accounts, amounts));
      console.log(result);
      expect(result).to.equal(true);
    });

    it('should fail if the balance of owner is less than amount', async function () {
      const accounts = [buyer1.address, buyer2.address];
      const amounts = [10000, 2];
      await expect(proj.transferTask(accounts, amounts)).to.be.revertedWith("Balance of owner is less than amount");
    });
  });
});