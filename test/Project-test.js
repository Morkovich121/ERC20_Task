const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Project", function () {

  let owner
  let buyer
  let auct

  beforeEach(async function () {
    [owner, buyer] = await ethers.getSigners();

    const Project = await ethers.getContractFactory("Project", owner);
    proj = await Project.deploy();
    await proj.deployed();
  });
});
