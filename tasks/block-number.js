const { task } = require("hardhat/config");

task("block-number", "tells the number of block").setAction(
  async (taskArgs, hre) => {
    const block = await hre.ethers.provider.getBlockNumber();
    console.log(`block:${block}`);
  }
);
