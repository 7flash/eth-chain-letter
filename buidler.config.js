require('dotenv').config()
usePlugin("@nomiclabs/buidler-truffle5")

const { INFURA_KEY, PRIVATE_KEY } = process.env

module.exports = {
  solc: {
    version: require("solc/package.json").version,
    optimizer: {
      enabled: false,
      runs: 200
    },
    evmVersion: "petersburg"
  },
  networks: {
    develop: {
      url: "http://127.0.0.1:8545",
      accounts: "remote"
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    auto: {
      blockGasLimit: 7500000
    }
  }
};
