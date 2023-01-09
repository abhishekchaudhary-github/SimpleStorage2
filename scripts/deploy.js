const { ethers, run, network } = require("hardhat");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

async function main() {
  const factory = await ethers.getContractFactory("SimpleStorage");
  const contract = await factory.deploy();
  await contract.deployed();
  console.log(contract.address);
  if (network.config.chainId === 5 && process.env.ETHERSACN_KEY) {
    contract.deployTransaction.wait(6);
    console.log("verifying...");
    await verify(contract.address, []);
  }
  let val = await contract.retrieve();
  console.log(`PREVIOUS:${val}`);
  console.log("updating");
  const x = await contract.store("7");
  await x.wait(1);
  val = await contract.retrieve();
  console.log(`NEW:${val}`);
}

async function verify(contractAddress, args) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArgsParams: args,
    });
  } catch (err) {
    if (err.message.toLowerCase().includes("already verified")) {
      console.log("already verified contract");
    } else {
      console.log(err);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
