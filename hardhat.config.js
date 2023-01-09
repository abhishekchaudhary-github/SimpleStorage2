require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

const key = process.env.KEY;
const gurl = process.env.RPC_URL_GOERILLI;
const etherscanKey = process.env.ETHERSACN_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    goerilli: {
      url: gurl,
      accounts: [key],
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: etherscanKey,
  },
  gasReporter: {
    enabled: true,
    // outputFile: "report.txt",
    noColors: true,
    currency: "USD",
    // token: "ETH",
    // coinmarketcap:apikey,
  },
};
