const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("storage testing", () => {
  let factory, contract;
  beforeEach(async () => {
    factory = await ethers.getContractFactory("SimpleStorage");
    contract = await factory.deploy();
  });
  it("check retrieve", async () => {
    let initialVal = "0";
    let output = await contract.retrieve();
    assert.equal(output.toString(), initialVal);
  });
  it("check storage", async () => {
    let input = "7";
    let response = await contract.store(input);
    await response.wait(1);
    let output = await contract.retrieve();
    assert.equal(output.toString(), input);
  });
});
