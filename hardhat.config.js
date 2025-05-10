require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.16',
  networks: {
    zkEVM: {
      url: 'https://rpc.cardona.zkevm-rpc.com',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
