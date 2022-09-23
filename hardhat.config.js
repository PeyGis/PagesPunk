// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")

const dotenv = require("dotenv");
dotenv.config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby:{
      url: process.env.RINKEBY_RPC,
      accounts: [process.env.SIGNER_PRIVATE_KEY]
    }
  },
  etherscan:{
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY
    }
  }
};
