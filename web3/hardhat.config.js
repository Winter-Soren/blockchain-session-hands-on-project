require("@matterlabs/hardhat-zksync-solc");
require("@nomiclabs/hardhat-waffle");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    polygon: {
      url: 'https://rpc-amoy.polygon.technology',
      chainId: 80002,
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    },
    localhost: {
      url: 'http://127.0.0.1:8545', 
      chainId: 31337, 
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
    }
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
